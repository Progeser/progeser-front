import {ListedResource} from './listed-resource';
import {HttpResponse} from '@angular/common/http';
import {plainToClass} from 'class-transformer';
import {PaginatorResponseToResultMapperType} from '../../services/http/resource/resource.service';

export class InfiniteScrollableResource<T> extends ListedResource<T> {
  static createFromResponse<T extends object>(classReference: new (...args: any[]) => T, response: HttpResponse<T[]>):
    ListedResource<T> {
    const headers = response.headers;

    // todo: remove duplicate (params)
    return new InfiniteScrollableResource(
      parseInt(headers.get('Pagination-Current-Page'), 10),
      parseInt(headers.get('Pagination-Per'), 10),
      parseInt(headers.get('Pagination-Total-Pages'), 10),
      parseInt(headers.get('Pagination-Total-Count'), 10),
      plainToClass<T, object>(classReference, response.body)
    );
  }

  static appendResponseToInfiniteScrollableResource<T extends object>(infiniteScrollableResource: InfiniteScrollableResource<T>):
    PaginatorResponseToResultMapperType<T> {
    return (classReference: new (...args: any[]) => T, response: HttpResponse<T[]>): ListedResource<T> => {
      infiniteScrollableResource.appendPage(response.body);

      return infiniteScrollableResource;
    };
  }

  appendPage(itemsToAppend: T[]) {
    this.items.push(...itemsToAppend);

    this.currentPage++;
  }
}
