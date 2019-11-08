import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Plant, PlantStage} from '../../../models';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material';
import {AbstractWarnControl, warnMissingPlantStageSurface} from '../../../validators/plant-stages-warning';
import {ConfirmationDialogComponent} from '../../common/dialogs/confirmation-dialog/confirmation-dialog.component';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-manage-plant',
  templateUrl: './manage-plant.component.html',
  styleUrls: ['./manage-plant.component.scss']
})
export class ManagePlantComponent implements OnInit {
  form: FormGroup;

  constructor(protected formBuilder: FormBuilder,
              protected dialog: MatDialog) {
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
        Validators.required,
        warnMissingPlantStageSurface()
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
      surfaceNeeded: this.formBuilder.control(stage.surfaceNeeded),
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

  submitForm(confirmed = false) {
    const stagesControl = (this.form.get('stages') as AbstractWarnControl);

    if (!confirmed
      && stagesControl.warnings
      && stagesControl.warnings.missingPlantSurface) {
      this.openWarningSurfaceDialog();

      return;
    }
  }

  openWarningSurfaceDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Surface non renseignée pour un stade',
        message: 'Une surface n\'a pas été renseignée pour au moins un stade. <br>' +
          'L\'application ne pourra pas prévoir la surface nécessaire à la plante une fois la plante arrivée à ce stade.'
      }
    });

    dialogRef.afterClosed().pipe(
      filter(value => value)
    ).subscribe({
      next: () => this.submitForm(true)
    });
  }
}
