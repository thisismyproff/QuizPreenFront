import { TestBed } from '@angular/core/testing';

import { NobackGuard } from './noback.guard';

describe('NobackGuard', () => {
  let guard: NobackGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NobackGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
