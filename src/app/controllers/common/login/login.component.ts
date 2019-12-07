import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services';
import {MatDialog} from '@angular/material';
import {AskForAccountDialogComponent} from '../dialogs/ask-for-account-dialog/ask-for-account-dialog.component';
import {ForgotPasswordDialogComponent} from '../dialogs/forgot-password-dialog/forgot-password-dialog.component';
import {LoginAction} from '../../../models/actions/login-action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(protected formBuilder: FormBuilder,
              protected userService: UserService,
              protected dialog: MatDialog) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [
        Validators.required
      ]),
      password: this.formBuilder.control(null, [
        Validators.required
      ])
    });
  }

  submitForm() {
    if (!this.form.valid) {
      return;
    }

    this.userService.login(LoginAction.buildFromFormGroup(this.form));
  }

  openForgotPasswordDialog() {
    this.dialog.open(ForgotPasswordDialogComponent);
  }

  openAskForAccountDialog() {
    this.dialog.open(AskForAccountDialogComponent);
  }
}
