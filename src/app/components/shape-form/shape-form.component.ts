import {Component, Input, OnInit} from '@angular/core';
import {Shape} from '../../models/shape';
import {FormArray, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-shape-form',
  templateUrl: './shape-form.component.html',
  styleUrls: ['./shape-form.component.scss']
})
export class ShapeFormComponent implements OnInit {
  shapes: Shape[] = Shape.exampleData;

  @Input()
  shape: FormControl;

  @Input()
  dimensions: FormArray;

  constructor(protected formBuilder: FormBuilder) { }

  ngOnInit() {
    this.shape.valueChanges.subscribe({
      next: (shape: Shape) => {
        const temporaryDimensionsFormArrayControls = new Array(shape.numberDimensions)
          .fill(null, 0, shape.numberDimensions)
          .map(() => this.formBuilder.control(null));

        this.dimensions.controls = temporaryDimensionsFormArrayControls;
      }
    });
  }
}
