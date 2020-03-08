import {Injectable} from '@angular/core';
import {PaginatorResponseToResultMapperType, ResourceService} from '../resource/resource.service';
import { Resource} from '../../../models';
import {HttpClient} from '@angular/common/http';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PaginatedResource} from '../../../utils/paginator/paginated-resource';
import {classToPlain, plainToClass} from 'class-transformer';
import {PaginatorParams} from '../../../utils/paginator/paginator-params';
import {ListedResource} from '../../../utils/paginator/listed-resource';

@Injectable({
  providedIn: 'root'
})
export abstract class ChildResourceService<P extends Resource, T extends Resource> extends ResourceService<T> {
  protected abstract translationPath;

  protected constructor(protected http: HttpClient,
                        protected responseToSnackbarHandler: ResponseToSnackbarHandlerService,
                        protected typeClassReference: new (...args: any[]) => T,
                        protected parentResourceService: ResourceService<P>,
                        protected endpoint: string) {
    super(http, responseToSnackbarHandler, typeClassReference, endpoint);
  }

  find(
    paginatorParams: PaginatorParams = new PaginatorParams(),
    responseToResultMapper: PaginatorResponseToResultMapperType<T> = PaginatedResource.createFromResponse,
    parentResource?: P): Observable<ListedResource<T>> {
    const url = `${this.parentResourceService.getResourceEndpoint()}/${parentResource.id}/${this.endpoint}`;

    return this.http.get<T[]>(url, {
      params: this.buildPaginatorHttpParams(paginatorParams),
      observe: 'response'
    }).pipe(
      this.responseToSnackbarHandler.handle(this.translationPath + '.find'),
      map(response => responseToResultMapper(this.typeClassReference, response))
    );
  }

  createInParentResource(resource: T, parentResource: P): Observable<T> {
    const url = `${this.parentResourceService.getResourceEndpoint()}/${parentResource.id}/${this.endpoint}`;

    return this.handleRequest<T>('POST', url, 'create', {
      body: classToPlain<T>(resource)
    }).pipe(
      map(savedResource => plainToClass<T, object>(this.typeClassReference, savedResource))
    );
  }

  save(resource: T, parentResource: P, form: any): Observable<T> {
    const mergedResource: T = Object.assign(resource, form);

    if (mergedResource.isNewResource()) {
      return this.createInParentResource(mergedResource, parentResource);
    }

    return this.update(mergedResource);
  }

  saveAll(resources: T[], parentResource: P, forms: any[]): Observable<T[]> {
    const saveRequests: Observable<T>[] = [];

    for (let i = 0; i < resources.length; i++) {
      saveRequests.push(this.save(resources[i], parentResource, forms[i].value));
    }

    return forkJoin(saveRequests);
  }
}
