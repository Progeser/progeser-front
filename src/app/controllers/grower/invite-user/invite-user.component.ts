import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {
  form: FormGroup;
  roles = User.roles;
  roleLabels = User.roleLabels;

  constructor(protected formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      userMail: this.formBuilder.control(null, [
        Validators.required
      ]),
      userRole: this.formBuilder.control(null, [
        Validators.required
      ])
    });
  }

  submitForm() {

  }
}
