import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionEleveComponent } from './inscription-eleve.component';

describe('InscriptionEleveComponent', () => {
  let component: InscriptionEleveComponent;
  let fixture: ComponentFixture<InscriptionEleveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionEleveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
