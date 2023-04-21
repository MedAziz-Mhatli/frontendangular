import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursComponent } from './cours.component';

describe('ProduitsComponent', () => {
  let component: ProduitsComponent;
  let fixture: ComponentFixture<ProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
