import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionalTableComponent } from './adicional-table.component';

describe('AdicionalTableComponent', () => {
  let component: AdicionalTableComponent;
  let fixture: ComponentFixture<AdicionalTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionalTableComponent]
    });
    fixture = TestBed.createComponent(AdicionalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
