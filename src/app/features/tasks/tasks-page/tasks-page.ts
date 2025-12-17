import {Component, inject, ViewChild, ViewContainerRef} from '@angular/core';
import { Task as TaskService} from '../../../core/service/task';
import {AsyncPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Task} from '../../../task/task';
import {TaskHighlight} from '../task-highlight/task-highlight';

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

  @ViewChild('highlightContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  highlight(task: { id: number; title: string; completed: boolean } | {
    id: number;
    title: string;
    completed: boolean
  } | { id: number; title: string; completed: boolean }) {
    // Efface le contenu précédent
    this.container.clear();

    // Crée le composant TaskHighlight
    const ref = this.container.createComponent(TaskHighlight);

    // Passe les données au composant
    ref.instance.title = task.title;
  }
}
