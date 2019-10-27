import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Plant, Request} from '../../../models';

@Component({
  selector: 'app-requester-manage-request',
  templateUrl: './requester-manage-request.component.html',
  styleUrls: ['./requester-manage-request.component.scss']
})
export class RequesterManageRequestComponent implements OnInit {
  form: FormGroup;
  plants = Plant.exampleData;

  minDueDate = new Date();

  constructor(protected formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // Todo: plan possibility to modify requests
    this.initForm(new Request());
  }

  initForm(request: Request) {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(request.name, [
        Validators.required,
        Validators.minLength(4)
      ]),
      dueDate: this.formBuilder.control(request.dueDate, [
        Validators.required
      ]),
      plantNotExists: this.formBuilder.control(undefined === request.plantExists ? false : !request.plantExists),
      quantity: this.formBuilder.control(request.quantity),
      plant: this.formBuilder.control(request.plant, [
        Validators.required
      ]),
      plantStage: this.formBuilder.control(request.plantStage, [
        Validators.required
      ]),
      comment: this.formBuilder.control(request.comment),
      plantName: this.formBuilder.control(request.plantName, [
        Validators.required
      ]),
      temperature: this.formBuilder.control(request.temperature),
      humidity: this.formBuilder.control(request.humidity, [
        Validators.min(0),
        Validators.max(100)
      ])
    });

    this.form.get('plantNotExists').valueChanges.subscribe({
      next: (value) =>  this.disableHiddenFormFields(value)
    });
  }

  disableHiddenFormFields(plantNotExists: boolean) {
    const plantFormControl = this.form.get('plant');
    const plantNameFormControl = this.form.get('plantName');
    const plantStageFormControl = this.form.get('plantStage');

    if (plantNotExists) {
      plantFormControl.disable();
      plantStageFormControl.disable();
      plantNameFormControl.enable();
    } else {
      plantFormControl.enable();
      plantStageFormControl.enable();
      plantNameFormControl.disable();
    }
  }

  submitForm() {
    // todo
    console.log(this.form.valid);
  }
}
