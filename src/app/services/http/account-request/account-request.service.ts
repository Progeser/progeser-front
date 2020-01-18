import {Injectable} from '@angular/core';
import {ResourceService} from '../resource/resource.service';
import {HttpClient} from '@angular/common/http';
import {AccountRequest} from '../../../models/account-request';
import {Observable} from 'rxjs';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AccountRequestService extends ResourceService<AccountRequest> {
  protected translationPath = 'accountRequest';

  constructor(protected http: HttpClient,
              protected responseToSnackbarHandler: ResponseToSnackbarHandlerService) {
    super(http, responseToSnackbarHandler, AccountRequest, 'account_requests');
  }

  handleAccountRequest(accountRequestId: number, accept: boolean): Observable<AccountRequest | void> {
    let observableAction: Observable<AccountRequest | void>;
    if (true === accept) {
      observableAction = this.accept(accountRequestId);
    } else {
      observableAction = this.delete(accountRequestId);
    }

    return observableAction;
  }

  accept(accountRequestId: number): Observable<AccountRequest> {
    return this.handleRequest('POST', `/${accountRequestId}/accept`, 'accept');
  }
}
