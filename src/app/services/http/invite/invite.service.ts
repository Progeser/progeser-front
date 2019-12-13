import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';
import {ResourceService} from '../resource/resource.service';
import {Invite} from '../../../models/invite';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InviteService extends ResourceService<Invite> {
  protected translationPath = 'invite';

  constructor(protected http: HttpClient,
              protected responseToSnackbarHandler: ResponseToSnackbarHandlerService) {
    super(http, responseToSnackbarHandler, 'invites');
  }

  retry(inviteId: number): Observable<void> {
    return this.handleRequest('POST', `/${inviteId}/retry`, 'retry');
  }
}
