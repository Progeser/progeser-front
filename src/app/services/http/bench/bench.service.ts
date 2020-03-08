import {Injectable} from '@angular/core';
import {Bench, Greenhouse} from '../../../models';
import {HttpClient} from '@angular/common/http';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';
import {GreenhouseService} from '../greenhouse/greenhouse.service';
import {ChildResourceService} from '../child-resource/child-resource.service';

@Injectable({
  providedIn: 'root'
})
export class BenchService extends ChildResourceService<Greenhouse, Bench> {
  protected translationPath = 'bench';

  constructor(protected http: HttpClient,
              protected responseToSnackbarHandler: ResponseToSnackbarHandlerService,
              protected greenhouseService: GreenhouseService) {
    super(http, responseToSnackbarHandler, Bench, greenhouseService, 'benches');
  }
}
