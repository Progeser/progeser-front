import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validateMatchFormControl} from '../../../validators/match-form-control';
import {CrossFieldErrorMatcher} from '../../../utils/error-matchers/cross-field-error-matcher';
import {User} from '../../../models/user';
import {MatDialog} from '@angular/material';
import {ChangePasswordDialogComponent} from '../dialogs/change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {
  form: FormGroup;
  crossFieldErrorMatcher = new CrossFieldErrorMatcher();

  users = User.exampleData;

  constructor(protected formBuilder: FormBuilder,
              protected dialog: MatDialog) {
  }

  ngOnInit() {
    /*
      todo: three possible states:
        - create account after grower invitation
        - create account after asking for one (creation accepted by a grower)
        - modify account
        => set validators according to these possible states
     */

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
      email: this.formBuilder.control(null, [
        Validators.required,
        Validators.email
      ]),
      lab: this.formBuilder.control(null),
      responsible: this.formBuilder.control(null),
      responsibleNotExists: this.formBuilder.control(false),
      password: this.formBuilder.control(null, [
        Validators.required
      ]),
      repeatedPassword: this.formBuilder.control(null, [
        Validators.required
      ])
    }, {
      validators: [
        validateMatchFormControl(['password', 'repeatedPassword'])
      ]
    });

    this.form.get('responsibleNotExists').valueChanges.subscribe({
      next: () => this.form.get('responsible').setValue(null)
    });
  }

  isRequester(): boolean {
    // todo
    return true;
  }

  submitForm() {

  }

  openChangePasswordDialog() {
    this.dialog.open(ChangePasswordDialogComponent);
  }
}
