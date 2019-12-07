import {Injectable} from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {Token} from '../../models/token';
import {HttpUserService} from '../http';
import {SnackbarService} from '../snackbar/snackbar.service';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {LoginAction} from '../../models/actions/login-action';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected loggedUser: User = null;
  protected userToken: Token = null;

  constructor(protected router: Router,
              protected httpUserService: HttpUserService,
              protected snackbarService: SnackbarService) {
  }

  get user(): User {
    return this.loggedUser;
  }

  get token(): Token {
    return this.userToken;
  }

  hasToken(): boolean {
    return null != this.token;
  }

  isUserLoggedIn(): boolean {
    return this.hasToken() && null !== this.user;
  }

  hasRole(role: string): boolean {
    return this.isUserLoggedIn() && this.user.role === role;
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
}
