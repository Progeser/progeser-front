import { Injectable } from '@angular/core';
import {BaseService} from '../base/base.service';
import {HttpClient} from '@angular/common/http';
import {ResponseToSnackbarHandlerService} from '../response-to-snackbar-handler/response-to-snackbar-handler.service';
import {Observable, of} from 'rxjs';
import {Shape} from '../../../models/shape';
import {map, share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShapeService extends BaseService {
  protected translationPath = 'shape';
  protected baseUrl = `${this.baseApiUrl}/shapes`;
  protected cachedShapes: Shape[];
  protected shapesListSubscription;

  constructor(protected http: HttpClient,
              protected responseToSnackbarHandler: ResponseToSnackbarHandlerService) {
    super(http, responseToSnackbarHandler);
  }

  find(): Observable<Shape[]> {
    if (null != this.cachedShapes) {
      return of(this.cachedShapes);
    }

    if (null == this.shapesListSubscription) {
      this.shapesListSubscription = this.handleRequest<Shape[]>('GET', this.baseUrl, 'find').pipe(
        map(shapes => {
          shapes.push(Shape.otherShape);
          this.cachedShapes = shapes;

          return shapes;
        }),
        share()
      );
    }

    return this.shapesListSubscription;
  }
}
