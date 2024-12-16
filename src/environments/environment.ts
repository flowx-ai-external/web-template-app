// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'BASE_URL',
  staticAssetsPath: 'STATIC_ASSETS_PATH',

  processApiPath: '/onboarding',
  scanTimeout: 50000,

  keycloak: {
    // Url of the Identity Provider
    issuer: 'KEYCLOAK_ISSUER',

    // URL of the SPA to redirect the user to after login
    redirectUri: 'REDIRECT_URI',

    // The SPA's id.
    // The SPA is registerd with this id at the auth-serverß
    clientId: 'CLIENT_ID',

    responseType: 'code',
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    scope: 'openid profile email offline_access',
    // Remove the requirement of using Https to simplify the demo
    // THIS SHOULD NOT BE USED IN PRODUCTION
    // USE A CERTIFICATE FOR YOUR IDP
    // IN PRODUCTION
    requireHttps: true,
    // at_hash is not present in JWT token
    showDebugInformation: true,
    disableAtHashCheck: false,
  },
};
