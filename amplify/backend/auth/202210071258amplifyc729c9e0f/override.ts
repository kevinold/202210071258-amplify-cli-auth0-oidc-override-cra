import { AmplifyAuthCognitoStackTemplate } from '@aws-amplify/cli-extensibility-helper';

const allowedOAuthScopes = ["aws.cognito.signin.user.admin", "email", "openid", "phone", "profile"]

export function override(resources: AmplifyAuthCognitoStackTemplate) {
    // UserPoolClient CF Reference
    // https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cognito-userpoolclient.html

    resources.userPoolClient.addOverride("Properties.SupportedIdentityProviders", ["Auth0"])
    resources.userPoolClient.addOverride("Properties.CallbackURLs", ["http://localhost:3000/"])
    resources.userPoolClient.addOverride("Properties.LogoutURLs", ["http://localhost:3000/"])
    resources.userPoolClient.addOverride("Properties.AllowedOAuthFlows", ["code"])
    resources.userPoolClient.addOverride("Properties.AllowedOAuthScopes", allowedOAuthScopes)

    resources.userPoolClientWeb.addOverride("Properties.SupportedIdentityProviders", ["Auth0"])
    resources.userPoolClientWeb.addOverride("Properties.CallbackURLs", ["http://localhost:3000/"])
    resources.userPoolClientWeb.addOverride("Properties.LogoutURLs", ["http://localhost:3000/"])
    resources.userPoolClientWeb.addOverride("Properties.AllowedOAuthFlows", ["code"])
    resources.userPoolClientWeb.addOverride("Properties.AllowedOAuthScopes", allowedOAuthScopes)
}
