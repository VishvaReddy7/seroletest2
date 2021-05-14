import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersignupComponent } from './teachersignup.component';

describe('TeachersignupComponent', () => {
  let component: TeachersignupComponent;
  let fixture: ComponentFixture<TeachersignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
