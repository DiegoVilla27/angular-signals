import { Component, signal } from '@angular/core';

@Component({
  selector: 'signals-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {

  /**
   * Reactive counter state.
   *
   * The `signal` holds the current numeric value of the counter and automatically updates
   * any bound template elements whenever its value changes.
   *
   * @type {WritableSignal<number>}
   * @default 0
   */
  count = signal<number>(0);

  /**
   * Increases the counter by one.
   *
   * Uses `update()` to mutate the signal’s value based on its previous state.
   *
   * @public
   * @returns {void}
   */
  increment(): void {
    this.count.update(c => c + 1);
  }

  /**
   * Decreases the counter by one, with a lower bound of zero.
   *
   * Prevents negative values by checking the current count before decrementing.
   * Uses `update()` for a state-safe mutation.
   *
   * @public
   * @returns {void}
   */
  decrement(): void {
    this.count.update(c => (c <= 0) ? 0 : c - 1);
  }

  /**
   * Resets the counter to zero.
   *
   * Uses `set()` to directly assign a new value to the signal.
   *
   * @public
   * @returns {void}
   */
  reset(): void {
    this.count.set(0);
  }
}
