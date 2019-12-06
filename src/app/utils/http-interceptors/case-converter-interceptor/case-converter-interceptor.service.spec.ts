import { TestBed } from '@angular/core/testing';

import { CaseConverterInterceptorService } from './case-converter-interceptor.service';

describe('CaseConverterInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaseConverterInterceptorService = TestBed.get(CaseConverterInterceptorService);
    expect(service).toBeTruthy();
  });
});
