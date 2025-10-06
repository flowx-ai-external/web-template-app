export const environment = {
    production: false,
    baseUrl: 'https://admin-devmain-5x.dev3.flowxai.dev',
    staticAssetsPath: 'https://d22tnnndi9lo60.cloudfront.net/devmain-5x',
  
    processApiPath: '/onboarding',
    scanTimeout: 50000,
  
    keycloak: {
      // Url of the Identity Provider
      issuer: 'https://auth-devmain-5x.dev3.flowxai.dev/auth/realms/flowx',
  
      // URL of the SPA to redirect the user to after login
      redirectUri: 'http://localhost:4200/',
  
      // The SPA's id that is registered with this id at the auth-server
      clientId: 'flowx-platform-authenticate',
  
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
      disableAtHashCheck: false,
      showDebugInformation: false,
    },
  };
  

// export const environment = {
//   production: false,
//   baseUrl: 'BASE_URL',
//   staticAssetsPath: 'STATIC_ASSETS_PATH',

//   processApiPath: '/onboarding',
//   scanTimeout: 50000,

//   keycloak: {
//     // Url of the Identity Provider
//     issuer: 'KEYCLOAK_ISSUER',

//     // URL of the SPA to redirect the user to after login
//     redirectUri: 'REDIRECT_URI',

//     // The SPA's id that is registered with this id at the auth-server
//     clientId: 'CLIENT_ID',

//     responseType: 'code',
//     // set the scope for the permissions the client should request
//     // The first three are defined by OIDC.
//     scope: 'openid profile email offline_access',
//     // Remove the requirement of using Https to simplify the demo
//     // THIS SHOULD NOT BE USED IN PRODUCTION
//     // USE A CERTIFICATE FOR YOUR IDP
//     // IN PRODUCTION
//     requireHttps: true,
//     // at_hash is not present in JWT token
//     disableAtHashCheck: false,
//     showDebugInformation: true,
//   },
// };
