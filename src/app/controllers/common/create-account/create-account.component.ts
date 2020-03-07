import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {validateMatchFormControl} from '../../../validators/match-form-control';
import {CrossFieldErrorMatcher} from '../../../utils/error-matchers/cross-field-error-matcher';
import {UserService} from '../../../services';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  creationType: string;
  token: string;
  form: FormGroup;
  crossFieldErrorMatcher = new CrossFieldErrorMatcher();

  constructor(protected formBuilder: FormBuilder,
              protected userService: UserService,
              protected router: Router,
              route: ActivatedRoute) {
    this.creationType = route.snapshot.data.type;
    this.token = route.snapshot.paramMap.get('token');
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({});

    if (UserService.CREATION_TYPES[1] === this.creationType) {
      this.form.addControl('laboratory', this.formBuilder.control(null));
    }
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.userService.createUser(this.creationType, this.token, this.form.value).subscribe({
      next: () => this.router.navigate(['/common-home'])
    });
  }
}
