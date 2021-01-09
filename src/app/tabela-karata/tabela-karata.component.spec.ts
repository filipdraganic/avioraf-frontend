import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaKarataComponent } from './tabela-karata.component';

describe('TabelaKarataComponent', () => {
  let component: TabelaKarataComponent;
  let fixture: ComponentFixture<TabelaKarataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaKarataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaKarataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
