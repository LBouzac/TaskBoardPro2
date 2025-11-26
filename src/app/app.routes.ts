import { Routes } from '@angular/router';
import {About} from './about/about';
import {Home} from './home/home';
import {Task} from './task/task';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'task', component: Task }
];
