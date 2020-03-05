import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Resource} from '../../../models';
import {Observable, of} from 'rxjs';
import {BaseService} from '../base/base.service';
import {PaginatedResource} from '../../../utils/paginator/paginated-resource';
import {map} from 'rxjs/operators';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';
import {classToPlain, plainToClass} from 'class-transformer';
import {isNullOrUndefined, isObject} from 'util';
import {PaginatorParams} from '../../../utils/paginator/paginator-params';
import {ListedResource} from '../../../utils/paginator/listed-resource';
import merge from 'lodash/merge';

@Injectable({
  providedIn: 'root'
})
export abstract class ResourceService<T extends Resource> extends BaseService {
  private readonly resourceEndpoint: string;

  protected constructor(protected http: HttpClient,
                        protected responseToSnackbarHandler: ResponseToSnackbarHandlerService,
                        protected typeClassReference: new (...args: any[]) => T,
                        protected endpoint: string) {
    super(http, responseToSnackbarHandler);
    this.resourceEndpoint = `${this.baseApiUrl}/${this.endpoint}`;
  }

  // tslint:disable-next-line:max-line-length
  find(paginatorParams: PaginatorParams = new PaginatorParams(), responseToResultMapper: PaginatorResponseToResultMapperType<T> = PaginatedResource.createFromResponse): Observable<ListedResource<T>> {
    return this.http.get(this.getResourceEndpoint(), {
      params: this.buildPaginatorHttpParams(paginatorParams),
      observe: 'response'
    }).pipe(
      this.responseToSnackbarHandler.handle(this.translationPath + '.find'),
      map(response => responseToResultMapper(this.typeClassReference, response))
    );
  }

  get(id?: number): Observable<T> {
    if (isNullOrUndefined(id)) {
      return of(new this.typeClassReference());
    }

    return this.handleResourceRequest('GET', `/${id}`, 'get');
  }

  create(resource: T): Observable<T> {
    return this.handleResourceRequest('POST', '', 'create', {
      body: classToPlain<T>(resource)
    });
  }

  update(resource: T): Observable<T> {
    return this.handleResourceRequest('PUT', `/${resource.id}`, 'update', {
      body: classToPlain<T>(resource)
    });
  }

  delete(id: number): Observable<void> {
    if (isNullOrUndefined(id)) {
      return of(null);
    }

    return this.handleRequest<void>('DELETE', `${this.getResourceEndpoint()}/${id}`, 'delete');
  }

  saveForm(resource: T, form: any): Observable<T> {
    const mergedResource: T = merge(resource, form);

    if (mergedResource.isNewResource()) {
      return this.create(mergedResource);
    }

    return this.update(mergedResource);
  }

  getResourceEndpoint(): string {
    return this.resourceEndpoint;
  }

  protected handleResourceRequest(method: string, url = '', translationPath?: string, options?: object): Observable<T> {
    return super.handleRequest<T>(method, `${this.getResourceEndpoint()}${url}`, translationPath, options).pipe(
      map(resource => plainToClass<T, object>(this.typeClassReference, resource))
    );
  }

  protected buildPaginatorHttpParams(paginatorParams: PaginatorParams): HttpParams {
    let httpParams = new HttpParams();

    if (isNullOrUndefined(paginatorParams)) {
      return httpParams;
    }

    httpParams = this.buildHttpPaginatorParams(httpParams, paginatorParams);
    httpParams = this.buildHttpPaginatorFilterParams(httpParams, paginatorParams.filters);

    return httpParams;
  }

  protected buildHttpPaginatorParams(httpParams: HttpParams, paginatorParams?: PaginatorParams): HttpParams {
    return httpParams
      .set('page[number]', paginatorParams.page.toString())
      .set('page[size]', paginatorParams.itemsPerPage.toString());
  }

  protected buildHttpPaginatorFilterParams(httpParams: HttpParams, filters: object): HttpParams {
    if (!isObject(filters)) {
      return httpParams;
    }

    for (const filterKey in filters) {
      if (!filters.hasOwnProperty(filterKey)) {
        continue;
      }

      httpParams = httpParams.set(`filter[${filterKey}]`, filters[filterKey]);
    }

    return httpParams;
  }
}

export type PaginatorResponseToResultMapperType<T> =
  (classReference: new (...args: any[]) => T, response: HttpResponse<T[]>) => ListedResource<T>;
