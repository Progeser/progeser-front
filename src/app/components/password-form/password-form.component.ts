import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {validateMatchFormControl} from '../../validators/match-form-control';
import {CrossFieldErrorMatcher} from '../../utils/error-matchers/cross-field-error-matcher';
import {isNull} from 'util';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})
export class PasswordFormComponent implements OnInit {
  static readonly formControlNames = ['password', 'passwordConfirmation'];
  crossFieldErrorMatcher = new CrossFieldErrorMatcher();
  form: FormGroup;

  constructor(protected controlContainer: FormGroupDirective,
              protected formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.controlContainer.form;

    PasswordFormComponent.formControlNames.forEach(formControlName => {
      this.form.addControl(formControlName, this.formBuilder.control(null, [
        Validators.required
      ]));
    });

    this.addValidator();
    this.form.updateValueAndValidity();
  }

  // todo: create base component "formPart" and add this method in
  addValidator() {
    const passwordsEqualityValidator = validateMatchFormControl(['password', 'passwordConfirmation']);
    let validators;

    if (!isNull(this.form.validator)) {
      validators = [this.form.validator, passwordsEqualityValidator];
    } else {
      validators = passwordsEqualityValidator;
    }

    this.form.setValidators(validators);
  }
}
