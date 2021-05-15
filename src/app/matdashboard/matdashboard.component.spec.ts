import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatdashboardComponent } from './matdashboard.component';

describe('MatdashboardComponent', () => {
  let component: MatdashboardComponent;
  let fixture: ComponentFixture<MatdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
