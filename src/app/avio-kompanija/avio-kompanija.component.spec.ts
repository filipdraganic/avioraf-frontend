import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvioKompanijaComponent } from './avio-kompanija.component';

describe('AvioKompanijaComponent', () => {
  let component: AvioKompanijaComponent;
  let fixture: ComponentFixture<AvioKompanijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvioKompanijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvioKompanijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
