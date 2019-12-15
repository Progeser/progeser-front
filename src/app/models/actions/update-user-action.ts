import {FormGroup} from '@angular/forms';

export class UpdateUserAction {
  firstName: string;
  lastName: string;
  laboratory?: string;

  constructor(firstName: string, lastName: string, laboratory: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.laboratory = laboratory;
  }

  public static buildFromFormGroup(formGroup: FormGroup): UpdateUserAction {
    return new UpdateUserAction(formGroup.get('firstName').value, formGroup.get('lastName').value, formGroup.get('laboratory').value);
  }
}
