import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  protected readonly baseApiUrl = environment.baseApiUrl;
  protected abstract translationPath: string;

  protected constructor(protected http: HttpClient,
                        protected responseToSnackbarHandler: ResponseToSnackbarHandlerService) {
  }

  protected mapToBody() {
    return input$ => input$.pipe(
      map((response: HttpResponse<any>) => response.body)
    );
  }

  protected handleRequest<R>(method: string, url = '', translationPath?: string, options?: object): Observable<R> {
    return this.http.request<R>(method, `${url}`, options).pipe(
      this.responseToSnackbarHandler.handle(`${this.translationPath}.${translationPath}`)
    );
  }
}
