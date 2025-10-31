import { Component, signal } from '@angular/core';

@Component({
  selector: 'signals-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {

  count = signal<number>(0);

  increment(): void {
    this.count.set(this.count() + 1);
  }

  decrement(): void {
    this.count.set(this.count() <= 0 ? 0 : this.count() - 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
