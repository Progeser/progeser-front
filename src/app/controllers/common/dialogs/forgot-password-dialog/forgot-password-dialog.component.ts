import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {HttpUserService} from '../../../../services';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent implements OnInit {
  form: FormGroup;

  constructor(protected dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
              protected formBuilder: FormBuilder,
              protected httpUserService: HttpUserService) {
  }

  ngOnInit() {
    this.initForm();
  }

  protected initForm() {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [
        Validators.required,
        Validators.email
      ])
    });
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.httpUserService.forgotPassword(this.form.value).subscribe({
      next: () => this.dialogRef.close()
    });
  }
}
