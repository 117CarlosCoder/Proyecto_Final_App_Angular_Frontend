import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicarEmpleoComponent } from './aplicar-empleo.component';

describe('AplicarEmpleoComponent', () => {
  let component: AplicarEmpleoComponent;
  let fixture: ComponentFixture<AplicarEmpleoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AplicarEmpleoComponent]
    });
    fixture = TestBed.createComponent(AplicarEmpleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
