import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereComponent } from './categorie.component';

describe('CategorieComponent', () => {
  let component: CategorieComponent;
  let fixture: ComponentFixture<CategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
