import { Component, inject, OnInit } from '@angular/core';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { UsersService } from './services/users.service';

/**
 * Type describing the supported user management actions.
 */
export type UserActionType = "create" | "edit";

@Component({
  selector: 'signals-users',
  standalone: true,
  imports: [UserModalComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  /**
   * Currently selected user context for create/edit operations.
   *
   * @type {{ id: number | null, type: UserActionType } | null}
   * @default null
   * @remarks
   * - When null, no user modal is active.
   * - When non-null, contains the target user's id (or null for create)
   *   and the action type ("create" | "edit").
   */
  public userSelected: { id: number | null, type: UserActionType } | null = null;

  /**
   * Users service instance injected via Angular's functional inject().
   *
   * @private
   * @type {UsersService}
   */
  private _usersSvc = inject(UsersService);

  /**
   * Read-only signal exposing the current users list from the service.
   *
   * @readonly
   * @type {ReadonlySignal<any>} - signal shape is defined by UsersService
   * @remarks
   * Do not attempt to modify this signal directly; use service methods instead.
   */
  readonly users = this._usersSvc.users;

  /**
   * Angular lifecycle hook invoked after component construction.
   *
   * @returns {void}
   * @remarks
   * Triggers initial users loading.
   */
  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Requests the UsersService to retrieve the users list.
   *
   * @returns {void}
   */
  loadUsers(): void {
    this._usersSvc.getUsers();
  }

  /**
   * Prepare component state for creating or editing a user.
   *
   * @param {number | null} userId - ID of the user to edit; null when creating a new user.
   * @param {UserActionType} type - The action to perform: "create" | "edit".
   * @returns {void}
   * @remarks
   * Sets `userSelected` which can be used by a modal or child component to open
   * the corresponding UI for the requested action.
   */
  manageUser(userId: number | null, type: UserActionType): void {
    this.userSelected = {
      id: userId,
      type
    };
  }

  /**
   * Request deletion of a user via UsersService.
   *
   * @param {number} userId - ID of the user to delete.
   * @returns {void}
   * @remarks
   * Service handles the deletion and any subsequent state updates.
   */
  deleteUser(userId: number): void {
    this._usersSvc.deleteUser(userId);
  }

  /**
   * Clears the current user selection, closing any active create/edit context.
   *
   * @returns {void}
   */
  clearUserSelected(): void {
    this.userSelected = null;
  }
}
