import { LetService } from './let.service';

import { TestBed } from '@angular/core/testing';

describe('UserService', () => {
  let service: LetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
