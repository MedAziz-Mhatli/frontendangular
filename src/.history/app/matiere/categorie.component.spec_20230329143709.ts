import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereComponent } from './categorie.component';

describe('CategorieComponent', () => {
  let component: MatiereComponent;
  let fixture: ComponentFixture<MatiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatiereComponent ]
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
