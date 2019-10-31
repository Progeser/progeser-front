import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent implements OnInit {
  form: FormGroup;

  constructor(protected dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
              protected formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  protected initForm() {
    this.form = this.formBuilder.group({
      mail: this.formBuilder.control(null, [
        Validators.required
      ])
    });
  }

  submitForm() {
    this.dialogRef.close();
  }
}
