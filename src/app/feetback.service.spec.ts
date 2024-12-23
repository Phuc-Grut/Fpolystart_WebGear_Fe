import { TestBed } from '@angular/core/testing';
import { FeetbackService } from './service/feetback.service';

describe('FeetbackService', () => {
  let service: FeetbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeetbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
