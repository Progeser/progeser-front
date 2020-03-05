import {Injectable} from '@angular/core';
import {PaginatorResponseToResultMapperType, ResourceService} from '../resource/resource.service';
import {Bench, Greenhouse} from '../../../models';
import {HttpClient} from '@angular/common/http';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GreenhouseService} from '../greenhouse/greenhouse.service';
import {PaginatedResource} from '../../../utils/paginator/paginated-resource';
import {classToPlain, plainToClass} from 'class-transformer';
import {PaginatorParams} from '../../../utils/paginator/paginator-params';
import {ListedResource} from '../../../utils/paginator/listed-resource';

@Injectable({
  providedIn: 'root'
})
export class BenchService extends ResourceService<Bench> {
  protected translationPath = 'bench';

  constructor(protected http: HttpClient,
              protected responseToSnackbarHandler: ResponseToSnackbarHandlerService,
              protected greenhouseService: GreenhouseService) {
    super(http, responseToSnackbarHandler, Bench, 'benches');
  }

  // tslint:disable-next-line:max-line-length
  find(paginatorParams: PaginatorParams = new PaginatorParams(), responseToResultMapper: PaginatorResponseToResultMapperType<Bench> = PaginatedResource.createFromResponse, greenhouse?: Greenhouse): Observable<ListedResource<Bench>> {
    return this.http.get<Bench[]>(`${this.greenhouseService.getResourceEndpoint()}/${greenhouse.id}/benches`, {
      params: this.buildPaginatorHttpParams(paginatorParams),
      observe: 'response'
    }).pipe(
      this.responseToSnackbarHandler.handle(this.translationPath + '.find'),
      map(response => responseToResultMapper(this.typeClassReference, response))
    );
  }

  createInGreenhouse(resource: Bench, greenhouse: Greenhouse): Observable<Bench> {
    return this.handleRequest<Bench>('POST', `${this.greenhouseService.getResourceEndpoint()}/${greenhouse.id}/benches`, 'create', {
      body: classToPlain<Bench>(resource)
    }).pipe(
      map(savedResource => plainToClass<Bench, object>(this.typeClassReference, savedResource))
    );
  }

  save(resource: Bench, greenhouse: Greenhouse, form: any): Observable<Bench> {
    const mergedResource: Bench = Object.assign(resource, form);

    if (mergedResource.isNewResource()) {
      return this.createInGreenhouse(mergedResource, greenhouse);
    }

    return this.update(mergedResource);
  }

  saveAll(benches: Bench[], greenhouse: Greenhouse, forms: any[]): Observable<Bench[]> {
    const saveRequests: Observable<Bench>[] = [];

    for (let i = 0; i < benches.length; i++) {
      saveRequests.push(this.save(benches[i], greenhouse, forms[i].value));
    }

    return forkJoin(saveRequests);
  }
}
