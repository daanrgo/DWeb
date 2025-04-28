import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidasMenuComponent } from './comidas-menu.component';

describe('ComidasMenuComponent', () => {
  let component: ComidasMenuComponent;
  let fixture: ComponentFixture<ComidasMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComidasMenuComponent]
    });
    fixture = TestBed.createComponent(ComidasMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
