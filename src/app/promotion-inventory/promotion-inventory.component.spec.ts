import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionInventoryComponent } from './promotion-inventory.component';

describe('PromotionInventoryComponent', () => {
  let component: PromotionInventoryComponent;
  let fixture: ComponentFixture<PromotionInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
