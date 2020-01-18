import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Resource} from '../../../models';
import {Observable, of} from 'rxjs';
import {BaseService} from '../base/base.service';
import {PaginatedResource} from '../../../models/paginated-resource';
import {map} from 'rxjs/operators';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';
import {classToPlain, plainToClass} from 'class-transformer';

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

  find(currentPage?: number, itemsPerPage?: number): Observable<PaginatedResource<T>> {
    return this.http.get<T[]>(this.getResourceEndpoint(), {
      params: this.getPaginationParams(currentPage, itemsPerPage),
      observe: 'response'
    }).pipe(
      this.responseToSnackbarHandler.handle(this.translationPath + '.find'),
      map(response => this.getPaginatedResources(response))
    );
  }

  get(id?: number): Observable<T> {
    if (null === id) {
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
    return this.handleRequest<void>('DELETE', `/${id}`, 'delete');
  }

  saveForm(resource: T, form: any) {
    const mergedResource: T = Object.assign(resource, form);

    if (null === mergedResource.id) {
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

  protected getPaginationParams(currentPage = 1, itemsPerPage = 25): HttpParams {
    return new HttpParams()
      .set('page[number]', currentPage.toString())
      .set('page[size]', itemsPerPage.toString());
  }

  protected getPaginatedResources(response: HttpResponse<T[]>): PaginatedResource<T> {
    const headers = response.headers;

    return new PaginatedResource<T>(
      parseInt(headers.get('Pagination-Current-Page'), 10),
      parseInt(headers.get('Pagination-Per'), 10),
      parseInt(headers.get('Pagination-Total-Pages'), 10),
      parseInt(headers.get('Pagination-Total-Count'), 10),
      plainToClass<T, object>(this.typeClassReference, response.body)
    );
  }
}
