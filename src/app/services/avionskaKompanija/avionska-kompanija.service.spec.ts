import { TestBed } from '@angular/core/testing';

import { AvionskaKompanijaService } from './avionska-kompanija.service';

describe('AvionskaKompanijaService', () => {
  let service: AvionskaKompanijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvionskaKompanijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
