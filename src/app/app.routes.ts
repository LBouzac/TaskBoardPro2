import { Routes } from '@angular/router';
import {Home} from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'about',
    loadChildren: () => import('./features/about/routes').then(m => m.ABOUT_ROUTES)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./features/tasks-page/routes').then(m => m.TASKS_ROUTES)
  },
];
