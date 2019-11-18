import {Component, OnInit} from '@angular/core';
import {Shape} from '../../../models/shape';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-manage-pot',
  templateUrl: './manage-pot.component.html',
  styleUrls: ['./manage-pot.component.scss']
})
export class ManagePotComponent implements OnInit {
  form: FormGroup;
  shapes: Shape[] = Shape.exampleData;

  constructor(protected formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(null, [
        Validators.required
      ]),
      shape: this.formBuilder.control(null, [
        Validators.required
      ]),
      dimensions: this.formBuilder.array([], [
        Validators.required
      ])
    });

    this.form.get('shape').valueChanges.subscribe({
      next: (shape: Shape) => {
        const dimensionsFormArray = this.form.get('dimensions') as FormArray;

        dimensionsFormArray.clear();
        dimensionsFormArray.controls = new Array(shape.numberDimensions);
        dimensionsFormArray.controls.fill(this.formBuilder.control(''), 0, shape.numberDimensions);
      }
    });
  }

  submitForm() {
  }
}
