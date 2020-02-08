import { Injectable } from '@angular/core';
import {ResourceService} from '../resource/resource.service';
import {Bench, Greenhouse} from '../../../models';
import {HttpClient} from '@angular/common/http';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GreenhouseService} from '../greenhouse/greenhouse.service';
import {PaginatedResource} from '../../../models/paginated-resource';
import {classToPlain, plainToClass} from 'class-transformer';

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

  find(currentPage?: number, itemsPerPage?: number, greenhouse?: Greenhouse): Observable<PaginatedResource<Bench>> {
    return this.http.get<Bench[]>(`${this.greenhouseService.getResourceEndpoint()}/${greenhouse.id}/benches`, {
      params: this.getPaginationParams(currentPage, itemsPerPage),
      observe: 'response'
    }).pipe(
      this.responseToSnackbarHandler.handle(this.translationPath + '.find'),
      map(response => this.getPaginatedResources(response))
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
