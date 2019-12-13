import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {share, tap} from 'rxjs/operators';
import {Token} from '../../../models/token';
import {LoginAction} from '../../../models/actions/login-action';
import {User} from '../../../models/user';
import {BaseService} from '../base/base.service';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  protected refreshTokenRequest: Observable<Token> = null;
  protected translationPath = 'user';

  constructor(protected http: HttpClient,
              protected responseToSnackbarHandler: ResponseToSnackbarHandlerService) {
    super(http, responseToSnackbarHandler);
  }

  login(loginAction: LoginAction): Observable<Token> {
    return this.handleRequest<Token>('POST', `${this.baseApiUrl}/oauth/token`, 'login', {body: loginAction});
  }

  refreshToken(refreshToken: string): Observable<Token> {
    if (null === this.refreshTokenRequest) {
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

  forgotPassword(forgotPasswordForm): Observable<void> {
    return this.handleRequest<void>('POST', `${this.baseApiUrl}/passwords/forgot`, 'forgotPassword', {body: forgotPasswordForm});
  }
}
