import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {Task} from '../task/task';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    Task
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
