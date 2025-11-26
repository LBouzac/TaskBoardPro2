import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Task {
  tasks = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
  ];

  getTasks() {
    // Simulate an HTTP request with a delay
    return of(this.tasks).pipe(delay(500));
  }
  //
  // addTask(title: string) {
  //   const newTask = { id: this.tasks.length + 1, title, completed: false };
  //   this.tasks.push(newTask);
  //   return of(newTask).pipe(delay(500));
  // }
  //
  // completeTask(id: number) {
  //   const task = this.tasks.find(t => t.id === id);
  //   if (task) {
  //     task.completed = true;
  //   }
  //   return of(task).pipe(delay(500));
  // }

}
