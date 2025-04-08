import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidasDetailComponent } from './comidas-detail.component';

describe('ComidasDetailComponent', () => {
  let component: ComidasDetailComponent;
  let fixture: ComponentFixture<ComidasDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComidasDetailComponent]
    });
    fixture = TestBed.createComponent(ComidasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
