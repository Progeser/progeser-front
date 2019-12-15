import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validateMatchFormControl} from '../../../../validators/match-form-control';
import {CrossFieldErrorMatcher} from '../../../../utils/error-matchers/cross-field-error-matcher';
import {UserService} from '../../../../services/http/user/user.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {
  form: FormGroup;
  crossFieldErrorMatcher = new CrossFieldErrorMatcher();

  constructor(protected dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
              protected formBuilder: FormBuilder,
              protected httpUserService: UserService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      currentPassword: this.formBuilder.control(null, [
        Validators.required
      ]),
      password: this.formBuilder.control(null, [
        Validators.required
      ]),
      passwordConfirmation: this.formBuilder.control(null, [
        Validators.required
      ])
    }, {
      validators: [
        validateMatchFormControl(['password', 'passwordConfirmation'])
      ]
    });
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.httpUserService.updatePassword(this.form.value).subscribe({
      next: () => this.dialogRef.close()
    });
  }
}
