import {FormGroup} from '@angular/forms';

export class LoginAction {
  email: string;
  password: string;
  grantType: string;

  constructor(email: string, password: string, grantType?: string) {
    this.email = email;
    this.password = password;
    this.grantType = grantType || 'password';
  }

  public static buildFromFormGroup(formGroup: FormGroup): LoginAction {
    return new LoginAction(formGroup.get('email').value, formGroup.get('password').value);
  }
}
