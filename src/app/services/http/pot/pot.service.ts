import { Injectable } from '@angular/core';
import {ResourceService} from '../resource/resource.service';
import {Pot} from '../../../models/pot';
import {HttpClient} from '@angular/common/http';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PotService extends ResourceService<Pot> {
  protected translationPath = 'pot';

  constructor(protected http: HttpClient,
              protected responseToSnackbarHandler: ResponseToSnackbarHandlerService) {
    super(http, responseToSnackbarHandler, Pot, 'pots');
  }
}
