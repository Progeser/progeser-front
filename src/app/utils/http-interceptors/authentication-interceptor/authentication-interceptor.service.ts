import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {UserService} from '../../../services';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor {
  constructor(protected userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse, failedRequest: Observable<HttpEvent<any>>) => {
        return error.status === 401 ? this.refreshTokenAndRetryRequest(failedRequest) : throwError(error);
      })
    );
  }

  protected refreshTokenAndRetryRequest(request: Observable<HttpEvent<any>>): Observable<HttpEvent<any>> {
    return this.userService.refreshToken().pipe(
      switchMap(() => request)
    );
  }
}
