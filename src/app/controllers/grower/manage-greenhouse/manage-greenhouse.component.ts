import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Bench, Greenhouse} from '../../../models';
import {Shape} from '../../../models/shape';

@Component({
  selector: 'app-manage-greenhouse',
  templateUrl: './manage-greenhouse.component.html',
  styleUrls: ['./manage-greenhouse.component.scss']
})
export class ManageGreenhouseComponent implements OnInit {
  form: FormGroup;
  shapes: Shape[] = Shape.exampleData;

  constructor(protected formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm(new Greenhouse());
  }

  initForm(greenhouse: Greenhouse) {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(greenhouse.name, [
        Validators.required
      ]),
      length: this.formBuilder.control(greenhouse.height, [
        Validators.required
      ]),
      width: this.formBuilder.control(greenhouse.width, [
        Validators.required
      ]),
      occupation: this.formBuilder.control(greenhouse.occupation, [
      Validators.required
      ]),
      benches: this.formBuilder.array(greenhouse.benches.map(bench => this.createGreenhouseBenchFormGroup(bench)), [
        Validators.required
      ])
    });

    if (0 === this.form.get('benches').value.length) {
      this.pushBench();
    }
  }

  createGreenhouseBenchFormGroup(bench: Bench = new Bench()) {
    return this.formBuilder.group({
      name: this.formBuilder.control(bench.name, [
        Validators.required
      ]),
      shape: this.formBuilder.control(null, [
        Validators.required
      ]),
      dimensions: this.formBuilder.array([], [
        Validators.required
      ])
    });
  }

  pushBench() {
    (this.form.get('benches') as FormArray).push(this.createGreenhouseBenchFormGroup());
  }

  removeBench(i: number) {
    (this.form.get('benches') as FormArray).removeAt(i);
  }

  submitForm() {
    console.log(this.form.getRawValue());
  }
}
