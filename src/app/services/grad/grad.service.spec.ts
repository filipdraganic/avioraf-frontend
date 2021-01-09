import { GradService } from './grad.service';

import { TestBed } from '@angular/core/testing';

describe('UserService', () => {
  let service: GradService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
