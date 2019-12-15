import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';
import {MatDialog} from '@angular/material';
import {ChangePasswordDialogComponent} from '../dialogs/change-password-dialog/change-password-dialog.component';
import {UserService} from '../../../services';
import {UpdateUserAction} from '../../../models/actions/update-user-action';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {
  form: FormGroup;
  user: User;

  constructor(protected formBuilder: FormBuilder,
              protected dialog: MatDialog,
              protected userService: UserService) {
    this.user = userService.user;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      firstName: this.formBuilder.control(null, [
        Validators.required
      ]),
      lastName: this.formBuilder.control(null, [
        Validators.required
      ]),
      laboratory: this.formBuilder.control(null),
    });
  }

  isRequester(): boolean {
    return this.userService.hasRole(User.roles[0]);
  }

  submitForm() {
    this.userService.updateUser(UpdateUserAction.buildFromFormGroup(this.form)).subscribe();
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangePasswordDialogComponent);
  }
}
