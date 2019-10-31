import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services';
import {MatDialog} from '@angular/material';
import {AskForAccountDialogComponent} from '../dialogs/ask-for-account-dialog/ask-for-account-dialog.component';
import {ForgotPasswordDialogComponent} from '../dialogs/forgot-password-dialog/forgot-password-dialog.component';

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
      mail: this.formBuilder.control(null, [
        Validators.required
      ]),
      password: this.formBuilder.control(null, [
        Validators.required
      ])
    });
  }

  submitForm() {
    this.userService.login();
  }

  openForgotPasswordDialog() {
    this.dialog.open(ForgotPasswordDialogComponent);
  }

  openAskForAccountDialog() {
    this.dialog.open(AskForAccountDialogComponent);
  }
}
