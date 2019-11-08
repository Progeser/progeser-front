import {Component, OnInit} from '@angular/core';
import {Greenhouse, PlantStage, Request, RequestDistribution} from '../../../models';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validateDistributionQuantity} from '../../../validators/distribution-quantity';

@Component({
  selector: 'app-manage-request-distribution',
  templateUrl: './manage-request-distribution.component.html',
  styleUrls: ['./manage-request-distribution.component.scss']
})
export class ManageRequestDistributionComponent implements OnInit {
  form: FormGroup;
  request: Request;
  greenhouses: Greenhouse[] = [];

  constructor(protected formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // todo: plan modification
    this.request = Request.exampleData[0];
    this.greenhouses = Greenhouse.exampleData;
    this.initForm();
  }

  initForm(requestDistributions: RequestDistribution[] = []) {
    this.form = this.formBuilder.group({
      requestDistributions: this.formBuilder.array(
        requestDistributions.map(requestDistribution => this.createRequestDistributionFormGroup(requestDistribution)),
        [
          Validators.required,
          validateDistributionQuantity(this.request.quantity)
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
      quantity: this.formBuilder.control(requestDistribution.quantity, [
        Validators.required
      ]),
      potSurface: this.formBuilder.control(requestDistribution.potSurface, [
        Validators.required
      ]),
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

    formGroup.get('plantStage').valueChanges.subscribe({
      next: value => {
        if (!this.plantStageHasSurface(value)) {
          formGroup.get('potSurface').enable();
        } else {
          formGroup.get('potSurface').disable();
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

  getNumberOfUndistributedPlants(): number {
    return this.request.quantity - this.getNumberOfDistributedPlants();
  }

  getNumberOfDistributedPlants(): number {
    return (this.form.get('requestDistributions') as FormArray)
      .getRawValue()
      .map(repartition => repartition.quantity ? repartition.quantity : 0)
      .reduce((accumulator, current) => accumulator + current);
  }

  plantStageHasSurface(plantStage?: PlantStage) {
    return null != plantStage.surfaceNeeded;
  }

  allDistributionsHaveStageWithSurface() {
    return (this.form.get('requestDistributions') as FormArray)
      .getRawValue()
      .every((distribution: RequestDistribution) => null == distribution.plantStage || this.plantStageHasSurface(distribution.plantStage));
  }
}
