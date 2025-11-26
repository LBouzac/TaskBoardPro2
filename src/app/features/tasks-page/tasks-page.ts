import {Component, inject} from '@angular/core';
import { Task as TaskService} from '../../core/service/task';
import {AsyncPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tasks-page',
  imports: [
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
})
export class TasksPage {
  task$!: ReturnType<TaskService['getTasks']>;
  addTask$ = inject(TaskService);

  constructor(protected taskService: TaskService) {
    this.task$ = this.taskService.getTasks();
  }

  addTask(title: string) {
    this.addTask$.addTask(title);
  }
  protected readonly TaskService = TaskService;

}
