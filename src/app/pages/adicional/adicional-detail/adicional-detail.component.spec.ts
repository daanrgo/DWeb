import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionalDetailComponent } from './adicional-detail.component';

describe('AdicionalDetailComponent', () => {
  let component: AdicionalDetailComponent;
  let fixture: ComponentFixture<AdicionalDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionalDetailComponent]
    });
    fixture = TestBed.createComponent(AdicionalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
