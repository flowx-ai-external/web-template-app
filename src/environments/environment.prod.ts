export const environment = {
  production: true,
  baseUrl: '${BASE_API_URL}',
  adminUrl: '${ADMIN_API_URL}',
  staticAssetsPath: '${STATIC_ASSETS_PATH}',
  processApiPath: '${PROCESS_API_PATH}',
  keycloak: {
    // Url of the Identity Provider
    issuer: '${KEYCLOAK_ISSUER}',

    // URL of the SPA to redirect the user to after login
    redirectUri: '${KEYCLOAK_REDIRECT_URI}',

    // The SPA's id.
    // The SPA is registerd with this id at the auth-serverß
    clientId: '${KEYCLOAK_CLIENT_ID}',

    responseType: 'code',
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    scope: '${KEYCLOAK_SCOPES}',
    requireHttps: '${REQUIRE_HTTPS}',
    // at_hash is not present in JWT token
    showDebugInformation: '${SHOW_DEBUG_INFORMATION}',
    disableAtHashCheck: '${DISABLE_AT_HASH_CHECK}',
  },
};
