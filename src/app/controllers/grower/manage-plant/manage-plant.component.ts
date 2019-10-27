import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Plant, PlantStage} from '../../../models';
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
      stages: this.formBuilder.array(plant.stages.map(stage => this.createPlantStageFormGroup(stage)), [
        Validators.required
      ])
    });

    // We force the plant to have at least one stage.
    if (0 === this.form.get('stages').value.length) {
      this.pushStage();
    }
  }

  createPlantStageFormGroup(stage: PlantStage = new PlantStage()) {
    return this.formBuilder.group({
      name: this.formBuilder.control(stage.name, [
        Validators.required
      ]),
      surfaceNeeded: this.formBuilder.control(stage.surfaceNeeded, [
        Validators.required
      ]),
      duration: this.formBuilder.control(stage.duration, [
        Validators.required
      ])
    });
  }

  pushStage() {
    (this.form.get('stages') as FormArray).push(this.createPlantStageFormGroup());
  }

  removeStage(stageIndex: number) {
    (this.form.get('stages') as FormArray).removeAt(stageIndex);
  }

  onStageMoved(event: CdkDragDrop<PlantStage[]>) {
    // todo
  }

  submitForm() {
  }
}
