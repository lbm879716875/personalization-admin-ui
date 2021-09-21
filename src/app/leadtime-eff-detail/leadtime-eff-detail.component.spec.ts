import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadtimeEffDetailComponent } from './leadtime-eff-detail.component';

describe('LeadtimeEffDetailComponent', () => {
  let component: LeadtimeEffDetailComponent;
  let fixture: ComponentFixture<LeadtimeEffDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadtimeEffDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadtimeEffDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
