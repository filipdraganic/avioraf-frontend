import { KorisnikService } from './korisnik.service';

import { TestBed } from '@angular/core/testing';

describe('UserService', () => {
  let service: KorisnikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KorisnikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
