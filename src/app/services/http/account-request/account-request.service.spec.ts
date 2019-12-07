import { TestBed } from '@angular/core/testing';

import { AccountRequestService } from './account-request.service';

describe('AccountRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountRequestService = TestBed.get(AccountRequestService);
    expect(service).toBeTruthy();
  });
});
