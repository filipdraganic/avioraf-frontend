import { RezervacijaService } from './rezervacija.service';

import { TestBed } from '@angular/core/testing';

describe('UserService', () => {
  let service: RezervacijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RezervacijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
