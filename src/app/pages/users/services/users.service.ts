import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';
import { IUserEntity } from '../entities/user.entity';
import { IUserModel } from '../models/user.models';
import usersMapper from './users.mapper';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  /**
   * Signal holding the current list of users.
   *
   * Read by components to render the users collection. Use provided service
   * methods to modify the collection; do not mutate the signal value directly.
   *
   * @type {Signal<IUserEntity[]>}
   * @readonly
   */
  readonly users = signal<IUserEntity[]>([]);

  /**
   * HttpClient instance injected via Angular's functional inject().
   *
   * @private
   * @type {HttpClient}
   */
  private _http: HttpClient = inject(HttpClient);

  /**
   * Fetches the users list from the remote API and maps it to IUserEntity items.
   *
   * Invokes the external JSONPlaceholder endpoint, transforms the received IUserModel[]
   * using usersMapper and updates the internal users signal. This method performs
   * side effects (network call and signal update) and returns void.
   *
   * @returns {void}
   */
  getUsers(): void {
    this._http
      .get<IUserModel[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map(usersMapper),
        tap((users) => this.users.set(users))
      ).subscribe();
  }

  /**
   * Retrieves a user entity from the current signal value by id.
   *
   * This is a synchronous read from the in-memory signal. If the user is not found,
   * undefined is returned.
   *
   * @param {number} userId - Identifier of the user to retrieve.
   * @returns {IUserEntity | undefined} The matching user entity or undefined if not found.
   */
  getUserById(userId: number): IUserEntity | undefined {
    return this.users().find((user) => user.id
      === userId);
  }

  /**
   * Appends a new user to the users signal.
   *
   * This method updates the in-memory collection only. Remote persistence is not performed.
   *
   * @param {IUserEntity} user - The user entity to add.
   * @returns {void}
   */
  createUser(user: IUserEntity): void {
    this.users.update((users) => [...users, user]);
  }

  /**
   * Updates an existing user in the users signal by merging the provided fields.
   *
   * If no user with the given id exists, the collection remains unchanged.
   *
   * @param {number} userId - Identifier of the user to update.
   * @param {IUserEntity} user - Partial or full user data to merge into the existing entity.
   * @returns {void}
   */
  updateUser(userId: number, user: IUserEntity): void {
    this.users.update((users) => users.map((u) => (u.id === userId) ? { ...u, ...user } : u));
  }

  /**
   * Removes a user from the users signal by id.
   *
   * @param {number} userId - Identifier of the user to remove.
   * @returns {void}
   */
  deleteUser(userId: number): void {
    this.users.update((users) => users.filter((u) => u.id !== userId));
  }
}
