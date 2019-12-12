import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Resource} from '../../../models';
import {Observable} from 'rxjs';
import {BaseService} from '../base/base.service';
import {PaginatedResource} from '../../../models/paginated-resource';
import {map} from 'rxjs/operators';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';

@Injectable({
  providedIn: 'root'
})
export abstract class ResourceService<T extends Resource> extends BaseService {
  private readonly resourceEndpoint: string;

  protected constructor(protected http: HttpClient,
                        protected responseToSnackbarHandler: ResponseToSnackbarHandlerService,
                        protected endpoint: string) {
    super(http, responseToSnackbarHandler);

    this.resourceEndpoint = `${this.baseApiUrl}/${this.endpoint}`;
  }

  protected handleRequest<R>(method: string, url = '', translationPath?: string, options?: object): Observable<R> {
    return super.handleRequest<R>(method, `${this.getResourceEndpoint()}${url}`, translationPath, options);
  }

  protected getResourceEndpoint(): string {
    return this.resourceEndpoint;
  }

  find(currentPage = 1, itemsPerPage = 25): Observable<PaginatedResource<T>> {
    const queryParams = new HttpParams()
      .set('page[number]', currentPage.toString())
      .set('page[size]', itemsPerPage.toString());

    return this.http.get<T[]>(this.getResourceEndpoint(), {params: queryParams, observe: 'response'}).pipe(
      this.responseToSnackbarHandler.handle(this.translationPath + '.find'),
      map(response => {
        const headers = response.headers;

        return new PaginatedResource<T>(
          parseInt(headers.get('Pagination-Current-Page'), 10),
          parseInt(headers.get('Pagination-Per'), 10),
          parseInt(headers.get('Pagination-Total-Pages'), 10),
          parseInt(headers.get('Pagination-Total-Count'), 10),
          response.body
        );
      })
    );
  }

  get(id: number): Observable<T> {
    return this.handleRequest<T>('GET', `/${id}`, 'get');
  }

  create(resource: T): Observable<T> {
    return this.handleRequest<T>('POST',  '', 'create', {body: resource});
  }

  update(resource: T): Observable<T> {
    return this.handleRequest<T>('PUT', `/${resource.id}`, 'update', {body: resource});
  }

  delete(id: number): Observable<void> {
    return this.handleRequest<void>('DELETE', `/${id}`, 'delete');
  }
}
