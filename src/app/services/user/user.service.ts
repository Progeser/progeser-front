import {Injectable} from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {Token} from '../../models/token';
import {HttpUserService} from '../http';
import {SnackbarService} from '../snackbar/snackbar.service';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {LoginAction} from '../../models/actions/login-action';
import {UpdateUserAction} from '../../models/actions/update-user-action';
import {isNullOrUndefined} from 'util';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static readonly CREATION_TYPES = [
    'FROM_INVITE',
    'FROM_ACCOUNT_REQUEST'
  ];

  protected loggedUser: User = null;
  protected userToken: Token = null;

  constructor(protected router: Router,
              protected httpUserService: HttpUserService,
              protected snackbarService: SnackbarService) {
  }

  get user(): User {
    return this.loggedUser;
  }

  set user(user: User) {
    this.userToken = user.token;
    user.token = null;
    this.loggedUser = user;
  }

  get token(): Token {
    return this.userToken;
  }

  login(login: LoginAction) {
    this.httpUserService.login(login).pipe(
      tap(userToken => this.userToken = userToken),
      switchMap(() => this.httpUserService.getSelf()),
      tap(loggedUser => this.loggedUser = loggedUser),
      tap(() => this.router.navigate(['/common-home']))
    ).subscribe();
  }

  refreshToken(): Observable<any> {
    return this.httpUserService.refreshToken(this.token.refreshToken).pipe(
      tap(userToken => this.userToken = userToken),
      catchError(error => {
        this.logoutAfterSessionExpired();

        return throwError(error);
      })
    );
  }

  logout() {
    this.loggedUser = null;
    this.userToken = null;

    this.router.navigate(['/common-home']);
  }

  logoutAfterSessionExpired() {
    this.logout();
    this.snackbarService.error('Votre session a expiré, merci de vous reconnecter pour continuer à utiliser l\'application.');
  }

  updateUser(updateUserAction: UpdateUserAction): Observable<User> {
    return this.httpUserService.updateSelf(updateUserAction).pipe(
      tap((user) => this.loggedUser = user)
    );
  }

  createUser(creationType: string, creationToken: string, userInformationForm): Observable<User> {
    let observable: Observable<User>;
    if (creationType === UserService.CREATION_TYPES[0]) {
      observable = this.httpUserService.createFromInvite(creationToken, userInformationForm);
    } else {
      observable = this.httpUserService.createFromAccountRequest(creationToken, userInformationForm);
    }

    return observable.pipe(
      tap(user => this.user = user)
    );
  }

  resetForgottenPassword(token: string, forgotPasswordForm) {
    return this.httpUserService.resetPassword(token, forgotPasswordForm).pipe(
      tap(user => this.user = user)
    );
  }

  hasToken(): boolean {
    return !isNullOrUndefined(this.token);
  }

  isUserLoggedIn(): boolean {
    return this.hasToken() && null !== this.user;
  }

  hasRole(role: string): boolean {
    return this.isUserLoggedIn() && this.user.role === role;
  }
}
