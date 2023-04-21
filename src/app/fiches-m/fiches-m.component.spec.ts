import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichesMComponent } from './fiches-m.component';

describe('FichesMComponent', () => {
  let component: FichesMComponent;
  let fixture: ComponentFixture<FichesMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichesMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichesMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
