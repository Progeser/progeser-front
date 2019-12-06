import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';
import {EMPTY} from 'rxjs';

export class MissingTranslationLoggerHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    if (!environment.production) {
      console.warn(`Missing '${params.key}' translation`);
    }

    return EMPTY;
  }
}
