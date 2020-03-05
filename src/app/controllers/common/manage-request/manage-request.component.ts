import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Plant, Request} from '../../../models';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestService} from '../../../services/http';
import {map, switchMap} from 'rxjs/operators';
import {isNullOrUndefined} from 'util';
import {UserService} from '../../../services';
import {User} from '../../../models/user';
import {combineLatest} from 'rxjs';
import {PlantService} from '../../../services/http/plant/plant.service';
import {InfiniteScrollableResource} from '../../../utils/paginator/infinite-scrollable-resource';
import {PaginatorParamsBuilder} from '../../../utils/paginator/paginator-params-builder';

@Component({
  selector: 'app-manage-request',
  templateUrl: './manage-request.component.html',
  styleUrls: ['./manage-request.component.scss']
})
export class ManageRequestComponent implements OnInit {
  visualizationMode = true;
  request: Request = null;
  form: FormGroup;
  minDueDate = new Date();

  plantsPaginatedResource: InfiniteScrollableResource<Plant>;

  constructor(protected formBuilder: FormBuilder,
              protected router: Router,
              protected route: ActivatedRoute,
              protected userService: UserService,
              protected httpRequestService: RequestService,
              protected httpPlantService: PlantService) {
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
      },
      error: () => this.router.navigate(['/home-router'])
    });
  }

  get plantStages() {
    if (isNullOrUndefined(this.form.get('plant').value)) {
      return [];
    }

    return this.form.get('plant').value.stages;
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.httpRequestService.saveForm(this.request, this.form.value).subscribe({
      error: err => console.error(err)
    });
  }

  shouldDisableForm(): boolean {
    return isNullOrUndefined(this.request)
      || this.visualizationMode
      || this.request.isInCancelation()
      || this.request.isCanceled()
      || this.request.isDeclined()
      || (this.request.isAccepted() && this.userService.hasRole(User.roles[0]));
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
      plantNotExists: this.formBuilder.control(!this.request.isNewResource() && isNullOrUndefined(this.request.plantStage)),
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

    if (this.shouldDisableForm()) {
      this.form.disable();
    }
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
      next: () => {
        this.form.get('plant').setValue(undefined);
        this.form.get('plantStage').setValue(undefined);
        this.form.get('plantName').setValue(undefined);
        this.form.get('plantStageName').setValue(undefined);

        this.disablePlantInputAccordingToPlantExistence();
      }
    });
  }

  disablePlantInputAccordingToPlantExistence() {
    if (this.form.get('plantNotExists').value) {
      this.form.get('plant').disable();
      this.form.get('plantStage').disable();

      this.form.get('plantName').enable();
      this.form.get('plantStageName').enable();
    } else {
      this.form.get('plant').enable();
      this.form.get('plantStage').enable();

      this.form.get('plantName').disable();
      this.form.get('plantStageName').disable();
    }
  }
}
