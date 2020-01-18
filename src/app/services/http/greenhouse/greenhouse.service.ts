import {Injectable} from '@angular/core';
import {ResourceService} from '../resource/resource.service';
import {Greenhouse} from '../../../models';
import {HttpClient} from '@angular/common/http';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';

@Injectable({
  providedIn: 'root'
})
export class GreenhouseService extends ResourceService<Greenhouse> {
  protected translationPath = 'greenhouse';

  constructor(protected http: HttpClient,
              protected responseToSnackbarHandler: ResponseToSnackbarHandlerService) {
    super(http, responseToSnackbarHandler, Greenhouse, 'greenhouses');
  }
}
