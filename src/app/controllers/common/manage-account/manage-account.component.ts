import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';
import {MatDialog} from '@angular/material';
import {ChangePasswordDialogComponent} from '../dialogs/change-password-dialog/change-password-dialog.component';
import {UserService} from '../../../services';
import {UpdateUserAction} from '../../../models/actions/update-user-action';
import {PermissionService} from '../../../services/permission/permission.service';

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
              protected permissionService: PermissionService,
              protected userService: UserService) {
    this.user = userService.user;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      firstName: this.formBuilder.control(this.user.firstName, [
        Validators.required
      ]),
      lastName: this.formBuilder.control(this.user.lastName, [
        Validators.required
      ]),
      laboratory: this.formBuilder.control(this.user.laboratory),
    });
  }

  submitForm() {
    this.userService.updateUser(UpdateUserAction.buildFromFormGroup(this.form)).subscribe();
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangePasswordDialogComponent);
  }
}
