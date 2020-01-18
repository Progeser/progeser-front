import { TestBed } from '@angular/core/testing';

import { BenchService } from './bench.service';

describe('BenchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BenchService = TestBed.get(BenchService);
    expect(service).toBeTruthy();
  });
});
