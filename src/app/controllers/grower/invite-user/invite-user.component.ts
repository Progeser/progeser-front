import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';
import {InviteService} from '../../../services/http';
import {Router} from '@angular/router';
import {Invite} from '../../../models/invite';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {
  form: FormGroup;
  roles = User.roles;
  roleLabels = User.roleLabels;
  minValidityDate = new Date();

  constructor(protected formBuilder: FormBuilder,
              protected router: Router,
              protected httpInviteService: InviteService) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: this.formBuilder.control(null, [
        Validators.required
      ]),
      role: this.formBuilder.control(null, [
        Validators.required
      ]),
      firstName: this.formBuilder.control(null),
      lastName: this.formBuilder.control(null),
      laboratory: this.formBuilder.control(null),
    });
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.httpInviteService.saveForm(new Invite(), this.form.value).subscribe({
      next: () => this.router.navigate(['/grower/accounts-list'])
    });
  }
}
