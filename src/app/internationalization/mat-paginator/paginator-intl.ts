import {MatPaginatorIntl} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

export class PaginatorIntl extends MatPaginatorIntl {
  protected translateService: TranslateService;

  setTranslateService(translateService: TranslateService) {
    this.translateService = translateService;

    this.translateService.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  protected translateLabels() {
    this.itemsPerPageLabel = this.translateService.instant('phrases.itemsPerPage');
    this.previousPageLabel = this.translateService.instant('phrases.previousPage');
    this.nextPageLabel = this.translateService.instant('phrases.nextPage');
  }

  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.translateService.instant('ofItems')} ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} ${this.translateService.instant('phrases.ofItems')} ${length}`;
  }
}
