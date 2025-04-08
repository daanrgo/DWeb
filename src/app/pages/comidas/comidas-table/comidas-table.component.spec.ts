import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidasTableComponent } from './comidas-table.component';

describe('ComidasTableComponent', () => {
  let component: ComidasTableComponent;
  let fixture: ComponentFixture<ComidasTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComidasTableComponent]
    });
    fixture = TestBed.createComponent(ComidasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
