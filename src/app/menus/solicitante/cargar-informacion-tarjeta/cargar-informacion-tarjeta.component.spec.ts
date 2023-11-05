import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarInformacionTarjetaComponent } from './cargar-informacion-tarjeta.component';

describe('CargarInformacionTarjetaComponent', () => {
  let component: CargarInformacionTarjetaComponent;
  let fixture: ComponentFixture<CargarInformacionTarjetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarInformacionTarjetaComponent]
    });
    fixture = TestBed.createComponent(CargarInformacionTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
