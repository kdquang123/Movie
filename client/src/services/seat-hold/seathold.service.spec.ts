import { TestBed } from '@angular/core/testing';

import { SeatHoldService } from './seathold.service';

describe('SeatHoldService', () => {
  let service: SeatHoldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatHoldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
