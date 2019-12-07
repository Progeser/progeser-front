import { TestBed } from '@angular/core/testing';

import { ResponseToSnackbarHandlerService } from './response-to-snackbar-handler.service';

describe('ResponseToSnackbarHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResponseToSnackbarHandlerService = TestBed.get(ResponseToSnackbarHandlerService);
    expect(service).toBeTruthy();
  });
});
