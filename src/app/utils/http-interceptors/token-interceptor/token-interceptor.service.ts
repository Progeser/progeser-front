import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {UserService} from '../../../services';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(protected userService: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If the request doesn't aim the application API or if the user isn't logged in, don't intercept it.
    if (!request.url.startsWith(environment.baseApiUrl)
        || !this.userService.hasToken()) {
      return next.handle(request);
    }

    // Otherwise, add the token
    request = request.clone({
      setHeaders: {
        Authorization: `${this.userService.token.tokenType} ${this.userService.token.accessToken}`
      }
    });

    return next.handle(request);
  }
}
