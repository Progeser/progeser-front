import {FormGroup} from '@angular/forms';

export class ForgotPasswordAction {
  email: string;

  constructor(email: string) {
    this.email = email;
  }

  static buildFromFormGroup(formGroup: FormGroup): ForgotPasswordAction  {
    return new ForgotPasswordAction(formGroup.get('email').value);
  }
}
