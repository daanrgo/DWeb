import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypeDetailComponent } from './payment-type-detail.component';

describe('PaymentTypeDetailComponent', () => {
  let component: PaymentTypeDetailComponent;
  let fixture: ComponentFixture<PaymentTypeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentTypeDetailComponent]
    });
    fixture = TestBed.createComponent(PaymentTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
