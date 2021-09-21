import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadtimeEffComponent } from './leadtime-eff.component';

describe('LeadtimeEffComponent', () => {
  let component: LeadtimeEffComponent;
  let fixture: ComponentFixture<LeadtimeEffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadtimeEffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadtimeEffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
