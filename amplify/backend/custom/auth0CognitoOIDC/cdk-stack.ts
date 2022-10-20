import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import * as cognito from '@aws-cdk/aws-cognito';
import * as cdk from '@aws-cdk/core';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';

export class cdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });
    /* AWS CDK code goes here - learn more: https://docs.aws.amazon.com/cdk/latest/guide/home.html */
   
    const authResourceName = '202210071258amplifyc1a0c34fe'
    const dependencies: AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this,
      amplifyResourceProps.category,
      amplifyResourceProps.resourceName,
      [
        {
          category: "auth", 
          resourceName: authResourceName
        }
      ] 
    );

    const userPool = cognito.UserPool.fromUserPoolArn(this, "userPoolRef", cdk.Fn.ref(dependencies.auth[authResourceName].UserPoolArn))

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

    //const allowedOAuthScopes = ["aws.cognito.signin.user.admin", "email", "openid", "phone", "profile"]
    //const userPoolClientWeb = cognito.UserPoolClient.fromUserPoolClientId(this, "userPoolClientRef", cdk.Fn.ref(dependencies.auth['202210071258amplifyc1a0c34fe'].AppClientIDWeb))
    //console.log('uPCW: ', userPoolClientWeb)

    //const userPoolClientWebUpdates = userPoolClientWeb.node.defaultChild as cognito.CfnUserPoolClient // undefined
    //console.log('uPCWU: ', userPoolClientWebUpdates)

    // userPoolClientWebUpdates.addPropertyOverride("SupportedIdentityProviders", ["Auth0"])
    // userPoolClientWebUpdates.addPropertyOverride("CallbackURLs", ["http://localhost:3000/"])
    // userPoolClientWebUpdates.addPropertyOverride("LogoutURLs", ["http://localhost:3000/"])
    // userPoolClientWebUpdates.addPropertyOverride("AllowedOAuthFlows", ["code"])
    // userPoolClientWebUpdates.addPropertyOverride("AllowedOAuthFlowsUserPoolClient", "true")
    // userPoolClientWebUpdates.addPropertyOverride("AllowedOAuthScopes", allowedOAuthScopes)

  }
}