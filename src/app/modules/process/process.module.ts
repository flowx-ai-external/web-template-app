import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessComponent } from './process.component';
import { RouterModule, Routes } from '@angular/router';
import { FlxProcessModule } from '@flowx/angular-sdk';

import { MyCustomComponent } from '../../components/my-custom-component/my-custom.component';
import { LocalDataStoreService } from '../../services/local-data-store';
import { CustomLoaderComponent } from '../../components/my-custom-loader/my-custom-loader.component';

const routes: Routes = [
  {
    path: '',
    component: ProcessComponent,
  },
];

@NgModule({
  declarations: [ProcessComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
})
export class ProcessModule {}
