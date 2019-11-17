import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountRequest} from '../../../models/account-request';

@Component({
  selector: 'app-manage-account-request',
  templateUrl: './manage-account-request.component.html',
  styleUrls: ['./manage-account-request.component.scss']
})
export class ManageAccountRequestComponent implements OnInit {
  form: FormGroup;
  minValidityDate = new Date();

  constructor(protected formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm(AccountRequest.exampleData[0]);
  }

  initForm(accountRequest: AccountRequest) {
    this.form = this.formBuilder.group({
      firstName: this.formBuilder.control({value: accountRequest.firstName, disabled: true}),
      lastName: this.formBuilder.control({value: accountRequest.lastName, disabled: true}),
      description: this.formBuilder.control({value: accountRequest.description, disabled: true}),
      validUntil: this.formBuilder.control(null)
    });
  }

  submitForm() {
  }

  refuseAccountRequest() {
  }
}
