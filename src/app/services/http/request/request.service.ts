import { Injectable } from '@angular/core';
import {ResourceService} from '../resource/resource.service';
import {Request} from '../../../models';
import {HttpClient} from '@angular/common/http';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService extends ResourceService<Request> {
  protected translationPath = 'request';

  constructor(protected http: HttpClient,
              protected responseToSnackbarHandler: ResponseToSnackbarHandlerService) {
    super(http, responseToSnackbarHandler, Request, 'requests');
  }

  accept(id: number): Observable<Request> {
    return this.handleResourceRequest('POST', `/${id}/accept`, 'accept');
  }

  reject(id: number): Observable<Request> {
    return this.handleResourceRequest('POST', `/${id}/refuse`, 'reject');
  }

  cancel(id: number): Observable<Request> {
    return this.handleResourceRequest('POST', `/${id}/cancel`, 'cancel');
  }
}
