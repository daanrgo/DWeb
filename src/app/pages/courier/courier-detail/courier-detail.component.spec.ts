import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierDetailComponent } from './courier-detail.component';

describe('CourierDetailComponent', () => {
  let component: CourierDetailComponent;
  let fixture: ComponentFixture<CourierDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourierDetailComponent]
    });
    fixture = TestBed.createComponent(CourierDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
