import { Routes } from '@angular/router';

import { FlxMainComponent } from './components/main/main.component';
import { FlxProcessComponent } from './components/process/process.component';

export const routes: Routes = [{
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
    {
      path: 'main',
      component: FlxMainComponent,
    },
    {
      path: 'process',
      component: FlxProcessComponent,
    },
  ];
  
