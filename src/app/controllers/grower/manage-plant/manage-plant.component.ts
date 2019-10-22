import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Plant, PlantState} from '../../../models';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-manage-plant',
  templateUrl: './manage-plant.component.html',
  styleUrls: ['./manage-plant.component.scss']
})
export class ManagePlantComponent implements OnInit {
  form: FormGroup;

  constructor(protected formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // todo: plan modification
    this.initForm(new Plant());
  }

  initForm(plant: Plant) {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(plant.name, [
        Validators.required
      ]),
      states: this.formBuilder.array(plant.states.map(state => this.createPlantStateFormGroup(state)), [
        Validators.required
      ])
    });

    // We force the plant to have at least one state.
    if (0 === this.form.get('states').value.length) {
      this.pushState();
    }
  }

  createPlantStateFormGroup(state: PlantState = null) {
    if (null === state) {
      state = new PlantState();
    }

    return this.formBuilder.group({
      name: this.formBuilder.control(state.name, [
        Validators.required
      ]),
      surfaceNeeded: this.formBuilder.control(state.surfaceNeeded, [
        Validators.required
      ]),
      duration: this.formBuilder.control(state.duration, [
        Validators.required
      ])
    });
  }

  pushState() {
    (this.form.get('states') as FormArray).push(this.createPlantStateFormGroup());
  }

  removeState(stateIndex: number) {
    (this.form.get('states') as FormArray).removeAt(stateIndex);
  }

  onStateMoved(event: CdkDragDrop<PlantState[]>) {
    // todo
  }

  submitForm() {
  }
}
