import { AmplifyAuthCognitoStackTemplate } from '@aws-amplify/cli-extensibility-helper';


export function override(resources: AmplifyAuthCognitoStackTemplate) {
    // resources.userPoolClient.supportedIdentityProviders.push("Auth0")
    //console.log(resources.userPoolClient.supportedIdentityProviders)
    resources.userPoolClient.addOverride("Properties.SupportedIdentityProviders", ["Auth0"])
}
