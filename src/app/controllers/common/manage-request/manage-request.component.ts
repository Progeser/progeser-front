import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Plant, PlantStage, Request} from '../../../models';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestService} from '../../../services/http';
import {map, switchMap} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import {combineLatest} from 'rxjs';
import {PlantService} from '../../../services/http/plant/plant.service';
import {InfiniteScrollableResource} from '../../../utils/paginator/infinite-scrollable-resource';
import {PaginatorParamsBuilder} from '../../../utils/paginator/paginator-params-builder';
import {compareByProperty} from '../../../utils/comparators/compare-by-property';
import {PermissionService} from '../../../services/permission/permission.service';

@Component({
  selector: 'app-manage-request',
  templateUrl: './manage-request.component.html',
  styleUrls: ['./manage-request.component.scss']
})
export class ManageRequestComponent implements OnInit {
  compareById = compareByProperty('id');

  visualizationMode = true;
  request: Request = null;
  form: FormGroup;
  minDueDate = new Date();

  plantsPaginatedResource: InfiniteScrollableResource<Plant>;

  constructor(protected formBuilder: FormBuilder,
              protected router: Router,
              protected route: ActivatedRoute,
              protected permissionService: PermissionService,
              protected httpRequestService: RequestService,
              protected httpPlantService: PlantService) {
  }

  get plantStages(): PlantStage[] {
    if (isNullOrUndefined(this.form.get('plant').value)) {
      return [];
    }

    return this.form.get('plant').value.stages;
  }

  ngOnInit() {
    combineLatest(
      this.route.data.pipe(
        map(data => data.visualization)
      ),
      this.httpPlantService.find(undefined, InfiniteScrollableResource.createFromResponse),
      this.route.params.pipe(
        switchMap(params => this.httpRequestService.get(params.id))
      )
    ).subscribe({
      next: ([visualizationMode, plantsPaginatedResource, request]) => {
        this.visualizationMode = visualizationMode;
        this.plantsPaginatedResource = plantsPaginatedResource as InfiniteScrollableResource<Plant>;
        this.request = request;

        this.initForm();
        this.fillRequestNestedObjects();
      },
      error: () => this.router.navigate(['/home-router'])
    });
  }

  fillRequestNestedObjects() {
    if (!isNullOrUndefined(this.request.plant)) {
      this.request.plant = this.plantsPaginatedResource.items.find(plant => this.request.plant === plant.id);
      this.form.get('plant').setValue(this.request.plant);
    }

    if (!isNullOrUndefined(this.request.plantStage)) {
      this.request.plantStage = (this.request.plant as Plant).stages.find(plantStage => this.request.plantStage === plantStage.id);
      this.form.get('plantStage').setValue(this.request.plantStage);
    }
  }

  shouldDisableForm(): boolean {
    return isNullOrUndefined(this.request)
      || this.visualizationMode
      || this.request.isInCancelation()
      || this.request.isCanceled()
      || this.request.isDeclined()
      || (this.request.isAccepted() && this.permissionService.isRequester());
  }

  loadMorePlants() {
    this.httpPlantService.find(
      PaginatorParamsBuilder.createNextPageParamsFromListedResource(this.plantsPaginatedResource),
      InfiniteScrollableResource.appendResponseToInfiniteScrollableResource(this.plantsPaginatedResource)
    ).subscribe();

    // todo: disable loading more plants when all plants of the database have been loaded
  }

  switchInputMethodOnPlantExistenceChange() {
    this.form.get('plantNotExists').valueChanges.subscribe({
      next: () => this.disablePlantInputAccordingToPlantExistence()
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(this.request.name, [
        Validators.required,
        Validators.minLength(4)
      ]),
      dueDate: this.formBuilder.control(this.request.dueDate, [
        Validators.required
      ]),
      plantNotExists: this.formBuilder.control(true === this.request.plantNotExists),
      quantity: this.formBuilder.control(this.request.quantity, [
        Validators.required
      ]),
      plant: this.formBuilder.control(this.request.plant, [
        Validators.required
      ]),
      plantStage: this.formBuilder.control(this.request.plantStage, [
        Validators.required
      ]),
      plantName: this.formBuilder.control(this.request.plantName, [
        Validators.required
      ]),
      plantStageName: this.formBuilder.control(this.request.plantStageName, [
        Validators.required
      ]),
      comment: this.formBuilder.control(this.request.comment),
      temperature: this.formBuilder.control(this.request.temperature),
      photoperiod: this.formBuilder.control(this.request.photoperiod, [
        Validators.min(0),
        Validators.max(24)
      ])
    });

    this.switchInputMethodOnPlantExistenceChange();
    this.disablePlantInputAccordingToPlantExistence();
    this.resetPlantStageChoiceOnPlantChange();

    if (this.shouldDisableForm()) {
      this.form.disable();
    }
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.httpRequestService.saveForm(this.request, this.form.value).subscribe({
      next: request => this.request = request
    });
  }

  disablePlantInputAccordingToPlantExistence() {
    if (this.form.get('plantNotExists').value) {
      this.form.get('plant').disable();
      this.form.get('plantStage').disable();
      this.form.get('plant').setValue(null);
      this.form.get('plantStage').setValue(null);

      this.form.get('plantName').enable();
      this.form.get('plantStageName').enable();
    } else {
      this.form.get('plant').enable();
      this.form.get('plantStage').enable();

      this.form.get('plantName').disable();
      this.form.get('plantStageName').disable();
      this.form.get('plantName').setValue(null);
      this.form.get('plantStageName').setValue(null);
    }
  }

  resetPlantStageChoiceOnPlantChange() {
    this.form.get('plant').valueChanges.subscribe({
      next: () => this.form.get('plantStage').setValue(null)
    });
  }
}
