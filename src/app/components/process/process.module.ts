import { NgModule } from '@angular/core';
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
        action1: CustomLoaderComponent,
        action2: CustomLoaderComponent,
      },
      components: {
        MyCustomComponentIdentifier: MyCustomComponent,
      },
      services: {
        LocalDataStoreService,
      },
    }),
  ],
  exports: [FlxProcessModule]
})
export class ProcessModule {}
