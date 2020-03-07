import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validateMatchFormControl} from '../../../validators/match-form-control';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  form: FormGroup;

  constructor(protected formBuilder: FormBuilder,
              protected router: Router,
              protected route: ActivatedRoute,
              protected userService: UserService) { }

  ngOnInit() {
    this.route.params.pipe(
      map(params => params.token)
    ).subscribe({
      next: token => {
        this.token = token;
        this.initForm();
      }
    });
  }

  initForm() {
    this.form = this.formBuilder.group({});
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.userService.resetForgottenPassword(this.token, this.form.value).subscribe({
      next: () => this.router.navigate(['/common-home'])
    });
  }

}
