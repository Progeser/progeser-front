import {Component, Input, OnInit} from '@angular/core';
import {Shape, ModelableInterface} from '../../models/shape';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-shape-form',
  templateUrl: './shape-form.component.html',
  styleUrls: ['./shape-form.component.scss']
})
export class ShapeFormComponent implements OnInit {
  shapes: Shape[] = Shape.exampleData;

  @Input()
  form: FormGroup;

  constructor(protected formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form.get('shape').valueChanges.subscribe({
      next: (shape: Shape) => {
        const temporaryDimensionsFormArrayControls = new Array(shape.numberDimensions)
          .fill(null, 0, shape.numberDimensions)
          .map(() => this.formBuilder.control(null));

        (this.form.get('dimensions') as FormArray).controls = temporaryDimensionsFormArrayControls;
      }
    });
  }
}
