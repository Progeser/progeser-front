import {Component, OnInit} from '@angular/core';
import {Greenhouse, Request, RequestDistribution} from '../../../models';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pot} from '../../../models/pot';

@Component({
  selector: 'app-manage-request-distribution',
  templateUrl: './manage-request-distribution.component.html',
  styleUrls: ['./manage-request-distribution.component.scss']
})
export class ManageRequestDistributionComponent implements OnInit {
  form: FormGroup;
  request: Request;
  greenhouses: Greenhouse[] = [];
  pots: Pot[] = [];

  constructor(protected formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // todo: plan modification
    this.request = Request.exampleData[0];
    this.greenhouses = Greenhouse.exampleData;
    this.pots = Pot.exampleData;
    this.initForm();
  }

  initForm(requestDistributions: RequestDistribution[] = []) {
    this.form = this.formBuilder.group({
      requestDistributions: this.formBuilder.array(
        requestDistributions.map(requestDistribution => this.createRequestDistributionFormGroup(requestDistribution)),
        [
          Validators.required
        ]
      )
    });

    if (0 === this.form.get('requestDistributions').value.length) {
      this.pushDistribution();
    }
  }

  submitForm() {
    // todo
  }

  createRequestDistributionFormGroup(requestDistribution: RequestDistribution = new RequestDistribution()): FormGroup {
    const formGroup = this.formBuilder.group({
      greenhouse: this.formBuilder.control(null, [
        Validators.required
      ]), // todo: retrieve the greenhouse from the bench ?
      bench: this.formBuilder.control({value: requestDistribution.bench, disabled: null !== requestDistribution.bench}, [
        Validators.required
      ]),
      plantStage: this.formBuilder.control(requestDistribution.plantStage, [
        Validators.required
      ]),
      surfaceInputtedManually: this.formBuilder.control(requestDistribution.surfaceInputtedManually),
      quantity: this.formBuilder.control(requestDistribution.quantity, [
        Validators.required
      ]),
      pot: this.formBuilder.control(requestDistribution.pot, [
        Validators.required
      ]),
      manualSurface: this.formBuilder.control(requestDistribution.manualSurface, [
        Validators.required
      ])
    });

    formGroup.get('greenhouse').valueChanges.subscribe({
      next: value => {
        if (null !== value) {
          formGroup.get('bench').enable();
        } else {
          formGroup.get('bench').disable();
        }
      }
    });

    formGroup.get('surfaceInputtedManually').valueChanges.subscribe({
      next: value => {
        const quantityFormControl = formGroup.get('quantity');
        const potFormControl = formGroup.get('pot');
        const manualSurfaceFormControl = formGroup.get('manualSurface');

        if (true === value) {
          quantityFormControl.setValue(null);
          potFormControl.setValue(null);

          quantityFormControl.disable();
          potFormControl.disable();

          manualSurfaceFormControl.enable();
        } else {
          manualSurfaceFormControl.setValue(null);
          manualSurfaceFormControl.disable();

          quantityFormControl.enable();
          potFormControl.enable();
        }
      }
    });

    return formGroup;
  }

  pushDistribution(requestDistribution: RequestDistribution = new RequestDistribution()) {
    (this.form.get('requestDistributions') as FormArray).push(this.createRequestDistributionFormGroup(requestDistribution));
  }

  removeDistribution(index: number) {
    (this.form.get('requestDistributions') as FormArray).removeAt(index);
  }
}
