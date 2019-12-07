import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {AccountRequestService} from '../../../../services/http/account-request/account-request.service';
import {SnackbarService} from '../../../../services';

@Component({
  selector: 'app-ask-for-account-dialog',
  templateUrl: './ask-for-account-dialog.component.html',
  styleUrls: ['./ask-for-account-dialog.component.scss']
})
export class AskForAccountDialogComponent implements OnInit {
  form: FormGroup;

  constructor(protected dialogRef: MatDialogRef<AskForAccountDialogComponent>,
              protected formBuilder: FormBuilder,
              protected httpAccountRequestService: AccountRequestService,
              protected snackbarService: SnackbarService) {
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
      email: this.formBuilder.control(null, [
        Validators.required
      ]),
      comment: this.formBuilder.control(null)
    });
  }

  submitForm() {
    if (!this.form.valid) {
      return;
    }

    this.httpAccountRequestService.create(this.form.value).subscribe({
      next: () => this.dialogRef.close()
    });
  }
}
