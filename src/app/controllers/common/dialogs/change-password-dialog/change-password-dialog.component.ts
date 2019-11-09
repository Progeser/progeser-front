import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validateMatchFormControl} from '../../../../validators/match-form-control';
import {CrossFieldErrorMatcher} from '../../../../utils/error-matchers/cross-field-error-matcher';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
  form: FormGroup;
  crossFieldErrorMatcher = new CrossFieldErrorMatcher();

  constructor(protected formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      password: this.formBuilder.control(null, [
        Validators.required
      ]),
      newPassword: this.formBuilder.control(null, [
        Validators.required
      ]),
      repeatedNewPassword: this.formBuilder.control(null, [
        Validators.required
      ])
    }, {
      validators: [
        validateMatchFormControl(['newPassword', 'repeatedNewPassword'])
      ]
    });
  }

  submitForm() {
  }
}
