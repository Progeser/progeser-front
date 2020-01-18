import { TestBed } from '@angular/core/testing';

import { GreenhouseService } from './greenhouse.service';

describe('GreenhouseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GreenhouseService = TestBed.get(GreenhouseService);
    expect(service).toBeTruthy();
  });
});
