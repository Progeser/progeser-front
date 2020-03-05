import {ListedResource} from './listed-resource';
import {HttpResponse} from '@angular/common/http';
import {plainToClass} from 'class-transformer';

export class PaginatedResource<T> extends ListedResource<T> {
  static createFromResponse<T extends object>(classReference: new (...args: any[]) => T, response: HttpResponse<T[]>):
    ListedResource<T> {
    const headers = response.headers;

    return new PaginatedResource(
      parseInt(headers.get('Pagination-Current-Page'), 10),
      parseInt(headers.get('Pagination-Per'), 10),
      parseInt(headers.get('Pagination-Total-Pages'), 10),
      parseInt(headers.get('Pagination-Total-Count'), 10),
      plainToClass<T, object>(classReference, response.body)
    );
  }

  removeItemByIndex(index: number) {
    this.cachedItems.splice(index, 1);
    this.totalItems -= 1;

    this.recomputeVariables();
    this.updateItems();
  }
}
