import { Injectable } from '@angular/core';
import {ResourceService} from '../resource/resource.service';
import {Plant} from '../../../models';
import {HttpClient} from '@angular/common/http';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PlantService extends ResourceService<Plant> {
  protected translationPath = 'plant';

  constructor(protected http: HttpClient,
              protected responseToSnackbarHandler: ResponseToSnackbarHandlerService) {
    super(http, responseToSnackbarHandler, Plant, 'plants');
  }
}
