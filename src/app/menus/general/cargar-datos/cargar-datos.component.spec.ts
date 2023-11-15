import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarDatosComponent } from './cargar-datos.component';

describe('CargarDatosComponent', () => {
  let component: CargarDatosComponent;
  let fixture: ComponentFixture<CargarDatosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarDatosComponent]
    });
    fixture = TestBed.createComponent(CargarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
