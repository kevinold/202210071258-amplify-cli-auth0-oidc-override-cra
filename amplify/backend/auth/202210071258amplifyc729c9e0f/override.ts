import { AmplifyAuthCognitoStackTemplate } from '@aws-amplify/cli-extensibility-helper';


export function override(resources: AmplifyAuthCognitoStackTemplate) {
    resources.userPoolClient.addOverride("Properties.SupportedIdentityProviders", ["Auth0"])
}
