import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessComponent } from './process.component';
import { RouterModule, Routes } from '@angular/router';
import { FlxProcessModule } from '@flowx/angular-sdk';
import { MyCustomComponent } from '../../components/my-custom-component/my-custom.component';
import { LocalDataStoreService } from '../../services/local-data-store';

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
