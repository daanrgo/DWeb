import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionalFormComponent } from './adicional-form.component';

describe('AdicionalFormComponent', () => {
  let component: AdicionalFormComponent;
  let fixture: ComponentFixture<AdicionalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionalFormComponent]
    });
    fixture = TestBed.createComponent(AdicionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
