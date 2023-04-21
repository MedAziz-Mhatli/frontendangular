import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueAbonnementsComponent } from './historique-abonnements.component';

describe('HistoriqueAbonnementsComponent', () => {
  let component: HistoriqueAbonnementsComponent;
  let fixture: ComponentFixture<HistoriqueAbonnementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueAbonnementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueAbonnementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
