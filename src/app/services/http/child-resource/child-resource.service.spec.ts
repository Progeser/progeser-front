import { TestBed } from '@angular/core/testing';

import {ChildResourceService} from './child-resource.service';

describe('ChildResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChildResourceService = TestBed.get(ChildResourceService);
    expect(service).toBeTruthy();
  });
});
