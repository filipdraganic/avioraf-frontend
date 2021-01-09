import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaKarataComponent } from './izmena-karata.component';

describe('IzmenaKarataComponent', () => {
  let component: IzmenaKarataComponent;
  let fixture: ComponentFixture<IzmenaKarataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmenaKarataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmenaKarataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
