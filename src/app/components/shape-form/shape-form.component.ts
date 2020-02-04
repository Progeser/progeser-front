import {Component, Input, OnInit} from '@angular/core';
import {Shape} from '../../models/shape';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShapeService} from '../../services/http/shape/shape.service';
import {compareByProperty} from '../../utils/comparators/compare-by-property';

@Component({
  selector: 'app-shape-form',
  templateUrl: './shape-form.component.html',
  styleUrls: ['./shape-form.component.scss']
})
export class ShapeFormComponent implements OnInit {
  compareByName = compareByProperty('name');
  shapes: Shape[];

  @Input()
  form: FormGroup;

  constructor(protected formBuilder: FormBuilder,
              protected httpShapeService: ShapeService) { }

  ngOnInit() {
    this.httpShapeService.find().subscribe({
      next: shapes => this.shapes = shapes
    });

    this.toggleAreaField(this.form.get('shape').value);
    this.listenShapeChange();
  }

  listenShapeChange() {
    this.form.get('shape').valueChanges.subscribe({
      next: (shape: Shape) => this.chooseAreaOrDimensions(shape)
    });
  }

  chooseAreaOrDimensions(shape: Shape) {
    this.toggleAreaField(shape);
    this.hydrateDimensionsArrayByShape(shape);
  }

  toggleAreaField(shape: Shape) {
    if (shape.name !== Shape.otherShape.name) {
      this.form.removeControl('area');

      return;
    }

    if (null === this.form.get('area')) {
      this.form.addControl('area', this.formBuilder.control(null, [
        Validators.required
      ]));
    }
  }

  hydrateDimensionsArrayByShape(shape: Shape) {
    const temporaryDimensionsFormArrayControls = new Array(shape.dimensionNames.length)
      .fill(null, 0, shape.dimensionNames.length)
      .map(() => this.formBuilder.control(null, [
        Validators.required
      ]));

    (this.form.get('dimensions') as FormArray).controls = temporaryDimensionsFormArrayControls;
  }
}
