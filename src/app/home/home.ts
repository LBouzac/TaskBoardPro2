import { Component, ChangeDetectorRef, inject } from '@angular/core';
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
  count = 0;
  private cdr = inject(ChangeDetectorRef);
   ngOnInit() {
    setInterval(() => {
      this.count++;
      this.cdr.markForCheck();
    }, 1000);
  }
}
