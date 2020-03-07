import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {share, tap} from 'rxjs/operators';
import {Token} from '../../../models/token';
import {LoginAction} from '../../../models/actions/login-action';
import {User} from '../../../models/user';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';
import {UpdateUserAction} from '../../../models/actions/update-user-action';
import {isNull} from 'util';
import {ResourceService} from '../resource/resource.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ResourceService<User> {
  protected refreshTokenRequest: Observable<Token> = null;
  protected translationPath = 'user';

  constructor(protected http: HttpClient,
              protected responseToSnackbarHandler: ResponseToSnackbarHandlerService) {
    super(http, responseToSnackbarHandler, User, 'users');
  }

  login(loginAction: LoginAction): Observable<Token> {
    return this.handleRequest<Token>('POST', `${this.baseApiUrl}/oauth/token`, 'login', {body: loginAction});
  }

  refreshToken(refreshToken: string): Observable<Token> {
    if (isNull(this.refreshTokenRequest)) {
      const url = `${this.baseApiUrl}/oauth/token`;

      this.refreshTokenRequest = this.http.post<Token>(url, {refreshToken}).pipe(
        share(),
        tap(() => this.refreshTokenRequest = null)
      );
    }

    return this.refreshTokenRequest;
  }

  getSelf(): Observable<User> {
    return this.handleRequest<User>('GET', `${this.baseApiUrl}/me`, 'getSelf');
  }

  updateSelf(updateUserAction: UpdateUserAction): Observable<User> {
    return this.handleRequest<User>('PUT', `${this.baseApiUrl}/me`, 'updateSelf', {body: updateUserAction});
  }

  updatePassword(newPasswordForm): Observable<void> {
    return this.handleRequest<void>('PUT', `${this.baseApiUrl}/passwords`, 'updatePassword', {body: newPasswordForm});
  }

  resetPassword(resetPasswordToken: string, newPasswordForm): Observable<User> {
    const url = `${this.baseApiUrl}/passwords/${resetPasswordToken}/reset`;

    return this.handleRequest<User>('PUT', url, 'resetPassword', {body: newPasswordForm});
  }

  createFromInvite(inviteToken: string, userInformationForm): Observable<User> {
    return this.handleRequest<User>(
      'POST',
      `${this.baseApiUrl}/users/${inviteToken}/create_from_invite`,
      'createAccount', {body: userInformationForm}
      );
  }

  createFromAccountRequest(creationToken: string, userInformationForm): Observable<User> {
    return this.handleRequest<User>(
      'POST',
      `${this.baseApiUrl}/users/${creationToken}/create_from_account_request`,
      'createAccount', {body: userInformationForm}
    );
  }

  forgotPassword(forgotPasswordForm): Observable<void> {
    return this.handleRequest<void>('POST', `${this.baseApiUrl}/passwords/forgot`, 'forgotPassword', {body: forgotPasswordForm});
  }
}
