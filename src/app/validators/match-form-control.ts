import {FormGroup, ValidatorFn} from '@angular/forms';

export function validateMatchFormControl(sameValuesFormControlNames: string[]): ValidatorFn {
  return (formGroup: FormGroup) => {
    if (sameValuesFormControlNames
      .map(formControlName => formGroup.get(formControlName).value)
      .every(value => value === formGroup.get(sameValuesFormControlNames[0]).value)) {
      return null;
    }

    return {
      matchFormControl: {
        valid: false
      }
    };
  };
}
