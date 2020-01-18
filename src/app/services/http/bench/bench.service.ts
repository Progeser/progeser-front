import { Injectable } from '@angular/core';
import {ResourceService} from '../resource/resource.service';
import {Bench, Greenhouse} from '../../../models';
import {HttpClient} from '@angular/common/http';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';
import {Observable} from 'rxjs';
import {classToPlain, plainToClass} from 'class-transformer';
import {map} from 'rxjs/operators';
import {GreenhouseService} from '../greenhouse/greenhouse.service';
import {PaginatedResource} from '../../../models/paginated-resource';

@Injectable({
  providedIn: 'root'
})
export class BenchService extends ResourceService<Bench> {
  protected translationPath = 'bench';

  constructor(protected http: HttpClient,
              protected responseToSnackbarHandler: ResponseToSnackbarHandlerService,
              protected greenhouseService: GreenhouseService) {
    super(http, responseToSnackbarHandler, Greenhouse, 'benches');
  }

  createInGreenhouse(resource: Bench, greenhouse: Greenhouse): Observable<Bench> {
    return this.handleRequest<Bench>('POST', `${this.greenhouseService.getResourceEndpoint()}/${greenhouse.id}/benches`, 'create', {
      body: classToPlain<Bench>(resource)
    }).pipe(
      map(savedResource => plainToClass<Bench, object>(this.typeClassReference, savedResource))
    );
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
}
