import { KartaService } from './karta.service';

import { TestBed } from '@angular/core/testing';

describe('UserService', () => {
  let service: KartaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KartaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
