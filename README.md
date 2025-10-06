# Angular Starter FlowX Container App

Starter template for Angular app with FlowX Renderer SDK.

## Prerequisites

* `Node.js` min version 20 - [Download Node.js](https://nodejs.org/en/blog/release/v20.19.0)

* `Angular CLI` version 19. Install Angular CLI globally using the following command to install version 19:
```
npm install -g @angular/cli@19
```

This will allow you to run `ng` related commands from the terminal.

## Getting Started

* Get npm registry auth details from FlowX (.npmrc)

Create a `.npmrc` file and update the placeholder tokens with the ones provided by FlowX.
```
//<AUTH_REPO>:_auth="<AUTH_TOKEN>"
email=<AUTH_EMAIL>
registry=https://<AUTH_REPO>
always-auth=true
strict-ssl=true
```

* Add environment endpoints

In `src/environments/environment.ts` file, update the `flowx` object with the values provided by FlowX.
```ts
export const environment = {
  ...
  baseUrl: '<BASE_URL>',
  staticAssetsPath: '<STATIC_ASSETS_PATH>',
  ...
  keycloak: {
    issuer: '<KEYCLOACK_URL>',
    ...
    clientId: '<KEYCLOACK_CLIENT>',
  }
};

```

## Running the app

* Install dependencies
```
npm install
```

* Configure the details of the running process

In `src/app/components/process/process.component.ts` file, update the process details parameters:

```ts
  processName = 'PROCESS_NAME';
  themeId = 'THEME_ID';
  projectInfo = {projectId: 'PROJECT_ID'}
  workspaceId = 'WORKSPACE_ID';
``` 

* Start the Angular Development server:
  
```
ng serve
```

### Prerequisites & Documentation

[Using the Angular Renderer](https://docs.flowx.ai/docs/platform-deep-dive/core-components/renderer-sdks/angular-renderer)
