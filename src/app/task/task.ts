import {Component, inject} from '@angular/core';
import {Task as TaskService, TaskItem} from '../core/service/task';
import {AsyncPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task',
  imports: [
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  task$!: ReturnType<TaskService['getTasks']>;
  addTask$ = inject(TaskService);
  title: string | undefined;


  constructor(protected taskService: TaskService) {
    this.task$ = this.taskService.getTasks();
  }

  addTask(title: string) {
    this.addTask$.addTask(title);
  }

  clearTasks(): void {
    this.taskService.clearTasks();
  }
}
