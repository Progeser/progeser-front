import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Plant, PlantStage} from '../../../models';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {PlantService} from '../../../services/http/plant/plant.service';
import {FormArrayUtils} from '../../../utils/arrays/form-array-utils';

@Component({
  selector: 'app-manage-plant',
  templateUrl: './manage-plant.component.html',
  styleUrls: ['./manage-plant.component.scss']
})
export class ManagePlantComponent implements OnInit {
  form: FormGroup;
  plant: Plant;

  constructor(protected formBuilder: FormBuilder,
              protected router: Router,
              protected route: ActivatedRoute,
              protected httpPlantService: PlantService,
              protected dialog: MatDialog) {
  }

  get stagesFormArray(): FormArray {
    return (this.form.get('stages') as FormArray);
  }

  get stageControls(): AbstractControl[] {
    return this.stagesFormArray.controls.filter(control => false === control.get('deleted').value);
  }

  ngOnInit() {
    this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.httpPlantService.get(id))
    ).subscribe({
      next: plant => {
        this.plant = plant;
        this.initForm();
      },
      error: () => this.router.navigate(['/grower/plants-list'])
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(this.plant.name, [
        Validators.required
      ]),
      stages: this.formBuilder.array(this.plant.stages.map(stage => this.createPlantStageFormGroup(stage)), [
        Validators.required
      ])
    });

    // We force the plant to have at least one stage.
    if (0 === this.form.get('stages').value.length) {
      this.pushStage();
    }
  }

  createPlantStageFormGroup(stage: PlantStage) {
    return this.formBuilder.group({
      name: this.formBuilder.control(stage.name, [
        Validators.required
      ]),
      duration: this.formBuilder.control(stage.duration, [
        Validators.required
      ]),
      deleted: this.formBuilder.control(false)
    });
  }

  onStageMoved(event: CdkDragDrop<PlantStage[]>) {
    moveItemInArray(this.plant.stages, event.previousIndex, event.currentIndex);
    this.plant.recomputePositions();
    FormArrayUtils.swapFormArrayItems(this.form.get('stages') as FormArray, event.previousIndex, event.currentIndex);
  }

  pushStage() {
    this.stagesFormArray.push(this.createPlantStageFormGroup(new PlantStage()));
    this.plant.addStage();
  }

  removeStage(stageIndex: number) {
    this.stagesFormArray.at(stageIndex).get('deleted').setValue(true);
    this.plant.removeStage(stageIndex);
  }

  clearRemovedStages() {
    this.plant.clearStages();

    for (let i = 0; i < this.stagesFormArray.controls.length; i++) {
      if (true === this.stagesFormArray.controls[i].get('deleted').value) {
        this.stagesFormArray.removeAt(i);
      }
    }
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.httpPlantService.saveForm(this.plant, this.form.value).subscribe({
      next: () => this.clearRemovedStages()
    });
  }
}
