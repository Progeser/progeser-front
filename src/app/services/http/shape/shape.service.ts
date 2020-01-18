import { Injectable } from '@angular/core';
import {BaseService} from '../base/base.service';
import {HttpClient} from '@angular/common/http';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';
import {Observable} from 'rxjs';
import {Shape} from '../../../models/shape';

@Injectable({
  providedIn: 'root'
})
export class ShapeService extends BaseService {
  protected translationPath = 'shape';
  protected baseUrl = `${this.baseApiUrl}/shapes`;

  constructor(protected http: HttpClient,
              protected responseToSnackbarHandler: ResponseToSnackbarHandlerService) {
    super(http, responseToSnackbarHandler);
  }

  find(): Observable<Shape[]> {
    return this.handleRequest<Shape[]>('GET', this.baseUrl, 'find');
  }
}
