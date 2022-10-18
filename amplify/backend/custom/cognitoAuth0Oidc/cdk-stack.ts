import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import * as cdk from '@aws-cdk/core';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';
//import * as iam from '@aws-cdk/aws-iam';
//import * as sns from '@aws-cdk/aws-sns';
//import * as subs from '@aws-cdk/aws-sns-subscriptions';
//import * as sqs from '@aws-cdk/aws-sqs';
import * as cognito from '@aws-cdk/aws-cognito';

export class cdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });

    /* AWS CDK code goes here - learn more: https://docs.aws.amazon.com/cdk/latest/guide/home.html */

    const dependencies: AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this,
      amplifyResourceProps.category,
      amplifyResourceProps.resourceName,
      [{
        category: "auth", 
        resourceName: "202210071258amplifyc729c9e0f"
      }] 
    );

    const userPool = cognito.UserPool.fromUserPoolArn(this, "userPoolRef", cdk.Fn.ref(dependencies.auth['202210071258amplifyc729c9e0f'].UserPoolArn))

    userPool.addDomain('CognitoDomain', {
      cognitoDomain: {
        domainPrefix: `202210071258amplifyc729c9e0f-${cdk.Fn.ref('env')}`,
      },
    })

    new cognito.UserPoolIdentityProviderOidc(this, 'Auth0', {
        name: "Auth0",
        clientId: 'bSdJVwMcFJEZtN1UXK5ChmHL3UTqjCP3',
        clientSecret: 'PiBfO113p1xaf-yDYxefXjFGFL5OWYdOV0LQVtt4TQhwyqvEey6BN4WcB0mKVFdD',
        issuerUrl: 'https://dev-kevold-amz.us.auth0.com',
        userPool,
        attributeRequestMethod: cognito.OidcAttributeRequestMethod.POST,
        attributeMapping: {
          email: cognito.ProviderAttribute.other('email')
        },
        scopes: ['email','profile','openid'],
      });


    // Example 1: Set up an SQS queue with an SNS topic 

    /*
    const amplifyProjectInfo = AmplifyHelpers.getProjectInfo();
    const sqsQueueResourceNamePrefix = `sqs-queue-${amplifyProjectInfo.projectName}`;
    const queue = new sqs.Queue(this, 'sqs-queue', {
      queueName: `${sqsQueueResourceNamePrefix}-${cdk.Fn.ref('env')}`
    });
    // 👇create sns topic
    
    const snsTopicResourceNamePrefix = `sns-topic-${amplifyProjectInfo.projectName}`;
    const topic = new sns.Topic(this, 'sns-topic', {
      topicName: `${snsTopicResourceNamePrefix}-${cdk.Fn.ref('env')}`
    });
    // 👇 subscribe queue to topic
    topic.addSubscription(new subs.SqsSubscription(queue));
    new cdk.CfnOutput(this, 'snsTopicArn', {
      value: topic.topicArn,
      description: 'The arn of the SNS topic',
    });
    */

    // Example 2: Adding IAM role to the custom stack 
    /*
    const roleResourceNamePrefix = `CustomRole-${amplifyProjectInfo.projectName}`;
    
    const role = new iam.Role(this, 'CustomRole', {
      assumedBy: new iam.AccountRootPrincipal(),
      roleName: `${roleResourceNamePrefix}-${cdk.Fn.ref('env')}`
    }); 
    */

    // Example 3: Adding policy to the IAM role
    /*
    role.addToPolicy(
      new iam.PolicyStatement({
        actions: ['*'],
        resources: [topic.topicArn],
      }),
    );
    */

    // Access other Amplify Resources 
    /*
    const retVal:AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this, 
      amplifyResourceProps.category, 
      amplifyResourceProps.resourceName, 
      [
        {category: <insert-amplify-category>, resourceName: <insert-amplify-resourcename>},
      ]
    );
    */
  }
}