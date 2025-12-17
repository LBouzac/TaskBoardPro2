import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface TaskItem {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Task {
  private tasks = [
    { id: 1, title: 'Faire le ménage', completed: false },
    { id: 2, title: 'Faire les devoirs', completed: true },
    { id: 3, title: 'Faire les courses', completed: false },
  ];

  private TaskSubject = new BehaviorSubject<TaskItem[]>(this.tasks);

  getTasks() {
    return this.TaskSubject.asObservable();
  }

  addTask(title: string) {
    const newTask: TaskItem = {
      id: Math.max(...this.tasks.map(t => t.id), 0) + 1,
      title,
      completed: false,
    };
    this.tasks.push(newTask);
    this.TaskSubject.next([...this.tasks]);
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.TaskSubject.next([...this.tasks]);
  }

  terminateTask(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = true;
      this.TaskSubject.next([...this.tasks]);
    }
  }

  clearTasks() {
    this.tasks = [];
    this.TaskSubject.next([...this.tasks]);
  }
}
