import { NgModule } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FlxProcessModule } from '@flowx/angular-sdk';

import { LocalDataStoreService } from '../../services/local-data-store';
import { CustomLoaderComponent } from '../my-custom-loader/my-custom-loader.component';
import { MyCustomComponent } from '../my-custom-component/my-custom.component';

@NgModule({
  imports: [
    FlxProcessModule.withConfig({
      customLoader: {
        startProcess: CustomLoaderComponent,
        reloadProcess: CustomLoaderComponent,
        defaultAction: CustomLoaderComponent,
        defaultUpload: CustomLoaderComponent,
        actions: {
          action1: CustomLoaderComponent,
          action2: CustomLoaderComponent,
        },
      },
      components: {
        MyCustomComponentIdentifier: MyCustomComponent,
      },
      // Keys must match the custom validator names defined in the process
      validators: {
        customValidator:
          (...params: string[]) =>
          (control: AbstractControl) =>
            control.value === params[0] ? null : { customValidator: true },
      },
      services: {
        LocalDataStoreService,
      },
    }),
  ],
  exports: [FlxProcessModule],
})
export class ProcessModule {}
