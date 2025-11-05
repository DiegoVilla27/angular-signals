import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { List } from 'immutable';

/**
 * Interface defining a navigation menu item.
 *
 * Each menu entry contains:
 * - a `title`: the display text shown in the navigation bar.
 * - a `path`: the corresponding router path.
 */
interface IMenu {
  /** Display title for the navigation item. */
  title: string;

  /** Angular route path associated with the menu item. */
  path: string;
}

@Component({
  selector: 'signals-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  /**
   * Immutable list of navigation menu items.
   *
   * Each entry defines a route within the application that can be accessed
   * via the navigation bar.
   *
   * @readonly
   * @type {List<IMenu>}
   */
  public readonly menu: List<IMenu> = List([
    { title: 'Counter', path: '/counter' },
    { title: 'Users', path: '/users' }
  ]);
}