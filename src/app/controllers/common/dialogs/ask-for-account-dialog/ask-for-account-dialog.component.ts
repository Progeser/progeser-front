import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-ask-for-account-dialog',
  templateUrl: './ask-for-account-dialog.component.html',
  styleUrls: ['./ask-for-account-dialog.component.scss']
})
export class AskForAccountDialogComponent implements OnInit {
  form: FormGroup;

  constructor(protected dialogRef: MatDialogRef<AskForAccountDialogComponent>,
              protected formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  protected initForm() {
    this.form = this.formBuilder.group({
      firstName: this.formBuilder.control(null, [
        Validators.required
      ]),
      lastName: this.formBuilder.control(null, [
        Validators.required
      ]),
      mail: this.formBuilder.control(null, [
        Validators.required
      ]),
      description: this.formBuilder.control(null)
    });
  }

  submitForm() {
    this.dialogRef.close();
  }
}
