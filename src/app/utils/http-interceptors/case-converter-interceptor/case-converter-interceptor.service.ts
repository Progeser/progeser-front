import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from '../../../services';
import {filter, map} from 'rxjs/operators';
import {SnakeCaseToCamelCase} from '../../case-converters/snake-case-to-camel-case';
import {CamelCaseToSnakeCase} from '../../case-converters/camel-case-to-snake-case';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaseConverterInterceptorService implements HttpInterceptor {
  snakeToCamelCase: SnakeCaseToCamelCase;
  camelCaseToSnakeCase: CamelCaseToSnakeCase;

  constructor(protected userService: UserService) {
    this.snakeToCamelCase = new SnakeCaseToCamelCase();
    this.camelCaseToSnakeCase = new CamelCaseToSnakeCase();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If the request doesn't aim the application API, don't intercept it.
    if (!request.url.startsWith(environment.baseApiUrl)) {
      return next.handle(request);
    }

    // First, convert the request body to snake case
    request = request.clone({
      body: this.camelCaseToSnakeCase.convertKeys(request.body)
    });

    return next.handle(request).pipe(
      filter((event: HttpEvent<any>) => event instanceof HttpResponse),
      // then, convert the body response to camel case
      map((response: HttpResponse<any>) => response.clone({ body: this.snakeToCamelCase.convertKeys(response.body) }))
    );
  }
}
