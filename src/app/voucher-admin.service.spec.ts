import { TestBed } from '@angular/core/testing';

import { VoucherAdminService } from './voucher-admin.service';

describe('VoucherAdminService', () => {
  let service: VoucherAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoucherAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
