import { Component } from '@angular/core';
import { Task as TaskService} from '../core/service/task';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [
    AsyncPipe
  ],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  task$!: ReturnType<TaskService['getTasks']>;
  constructor(protected taskService: TaskService) {
    this.task$ = this.taskService.getTasks();
  }
  ngOnInit() {
    console.log(this.task$);
  }

  protected readonly TaskService = TaskService;
}
