import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionInventoryDetailComponent } from './promotion-inventory-detail.component';

describe('PromotionInventoryDetailComponent', () => {
  let component: PromotionInventoryDetailComponent;
  let fixture: ComponentFixture<PromotionInventoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionInventoryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionInventoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
