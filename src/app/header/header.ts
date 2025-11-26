import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  count = 0;
  private cdr = inject(ChangeDetectorRef);
  private intervalId?: number;


  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      this.count++;
      this.cdr.markForCheck();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    console.log('Compteur stoppé');
  }
}
