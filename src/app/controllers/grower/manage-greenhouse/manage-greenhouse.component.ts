import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Bench, Greenhouse} from '../../../models';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-manage-greenhouse',
  templateUrl: './manage-greenhouse.component.html',
  styleUrls: ['./manage-greenhouse.component.scss']
})
export class ManageGreenhouseComponent implements OnInit {
  form: FormGroup;

  constructor(protected formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm(new Greenhouse());
  }

  initForm(greenhouse: Greenhouse) {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(greenhouse.name, [
        Validators.required
      ]),
      length: this.formBuilder.control(greenhouse.length, [
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
      this.pushStage();
    }
  }

  createGreenhouseBenchFormGroup(bench: Bench = new Bench()) {
    return this.formBuilder.group({
      surface: this.formBuilder.control(bench.surface, [
        Validators.required
      ]),
      name: this.formBuilder.control(bench.name, [
        Validators.required
      ])
    });
  }

  pushStage() {
    (this.form.get('benches') as FormArray).push(this.createGreenhouseBenchFormGroup());
  }

  submitForm() {
  }

  onStageMoved($event: CdkDragDrop<Greenhouse[]>) {
  }
}
