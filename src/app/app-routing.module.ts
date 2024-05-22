import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPage} from './components/main/main.page';
import {ProcessModule} from './modules/process/process.module';

const routes: Routes = [{
  path: '',
  redirectTo: 'main',
  pathMatch: 'full',
},
  {
    path: 'main',
    component: MainPage,
  },
  {
    path: 'process',
    loadChildren: () => import('./modules/process/process.module').then(() => ProcessModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
