import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';

@Component({
  selector: 'app-manage-account-rights',
  templateUrl: './manage-account-rights.component.html',
  styleUrls: ['./manage-account-rights.component.scss']
})
export class ManageAccountRightsComponent implements OnInit {
  form: FormGroup;
  roles: string[] = User.roles;
  getRoleLabel = User.getRoleLabel;
  minValidityDate = new Date();

  constructor(protected formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm(User.exampleData[0]);
  }

  initForm(user: User) {
    this.form = this.formBuilder.group({
      firstName: this.formBuilder.control({value: user.firstName, disabled: true}),
      lastName: this.formBuilder.control({value: user.lastName, disabled: true}),
      roles: this.formBuilder.control(user.roles, [
        Validators.required
      ]),
      validUntil: this.formBuilder.control(user.validUntil)
    });
  }

  submitForm() {
  }
}
