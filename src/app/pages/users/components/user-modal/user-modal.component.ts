import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { UserActionType } from '../../users.component';
import { IUserEntity } from '../../entities/user.entity';

@Component({
  selector: 'signals-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss'
})
export class UserModalComponent {
  /**
   * ID of the user to edit. Provide null when creating a new user.
   *
   * @type {number | null}
   * @required
   */
  @Input({ required: true }) userId!: number | null;

  /**
   * Operation mode for the modal: "create" or "edit".
   *
   * @type {UserActionType}
   * @required
   */
  @Input({ required: true }) type!: UserActionType;

  /**
   * Emitted when the modal should be closed (after save or cancel).
   *
   * @event close
   */
  @Output() readonly close: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Reactive form backing the modal UI.
   *
   * Controls:
   * - id: required (disabled when editing)
   * - name: required
   * - email: required, must be a valid email
   * - phone: required
   *
   * @type {FormGroup}
   */
  public readonly form: FormGroup = inject(FormBuilder).group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]]
  });

  /**
   * UsersService instance injected via Angular's functional inject().
   *
   * @private
   * @type {UsersService}
   */
  private readonly _usersSvc = inject(UsersService);

  /**
   * Angular lifecycle hook. Initializes the form with data if editing.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.loadForm();
  }

  /**
   * Populate and configure the form based on provided inputs.
   *
   * - If `userId` references an existing user, patches the form with its data.
   * - Disables the `id` control when in "edit" mode to prevent modification.
   *
   * @private
   * @returns {void}
   */
  private loadForm(): void {
    const user = this.userId ? this._usersSvc.getUserById(this.userId) : null;
    if (user) {
      this.form.patchValue(user);
      if (this.type === 'edit') {
        this.form.get('id')?.disable();
      }
    } else {
      this.form.get('id')?.enable();
    }
  }

  /**
   * Validate form and perform create or update operation.
   *
   * - Marks all controls as touched when invalid and aborts.
   * - Reads the form's raw value as IUserEntity.
   * - Calls UsersService.createUser for "create" or UsersService.updateUser for "edit".
   * - Emits the `close` event after successful operation.
   *
   * @public
   * @returns {void}
   */
  public save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user = this.form.getRawValue() as IUserEntity;

    if (this.type === 'create') {
      this._usersSvc.createUser(user);
    } else {
      this._usersSvc.updateUser(user.id, user);
    }

    this.close.emit();
  }
}
