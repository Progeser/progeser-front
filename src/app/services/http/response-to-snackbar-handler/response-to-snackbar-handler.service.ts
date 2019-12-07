import {Injectable} from '@angular/core';
import {SnackbarService} from '../../snackbar/snackbar.service';
import {MonoTypeOperatorFunction, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ResponseToSnackbarHandlerService {
  protected static translationsRootPath = 'httpToSnackbarMessages.';

  constructor(protected snackbarService: SnackbarService,
              protected translateService: TranslateService) {
  }

  handle<T extends HttpResponse<any>>(messageKey: string): MonoTypeOperatorFunction<any> {
    return input$ => input$.pipe(
      catchError(error => this.handleError(error, messageKey)),
      tap(response => this.handleSuccess(response, messageKey))
    );
  }

  protected handleError(error: any, messageKey: string): Observable<any> {
    if (error instanceof HttpErrorResponse) {
      const messages: MessageList = this.getMessageByKey(messageKey);

      if (error.status in messages) {
        const message = messages[error.status];

        this.snackbarService.message(
          message.type ? message.type : 'error',
          message.message,
          message.duration ? message.duration : 0
        );
      } else if ('error' in messages && null != messages.error) {
        this.snackbarService.error(messages.error, 0);
      } else {
        this.snackbarService.error(error.error.error_description, 0);
      }
    }

    return throwError(error);
  }

  protected handleSuccess(response: any, messageKey: string): void {
    const messages: MessageList = this.getMessageByKey(messageKey);

    if ('success' in messages && null != messages.success) {
      this.snackbarService.success(messages.success);
    }
  }

  protected getMessageByKey(messageKey: string): MessageList {
    return this.translateService.instant(ResponseToSnackbarHandlerService.translationsRootPath + messageKey);
  }
}

interface MessageList {
  [key: number]: {
    message,
    type?: string,
    duration?: number
  };

  success?: string;
  error?: string;
}
