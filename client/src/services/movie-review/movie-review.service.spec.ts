import { TestBed } from '@angular/core/testing';

import { MovieReviewService } from './movie-review.service';

describe('MovieReviewService', () => {
  let service: MovieReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
