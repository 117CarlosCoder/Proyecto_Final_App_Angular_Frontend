import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarOfertaComponent } from './cargar-oferta.component';

describe('CargarOfertaComponent', () => {
  let component: CargarOfertaComponent;
  let fixture: ComponentFixture<CargarOfertaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarOfertaComponent]
    });
    fixture = TestBed.createComponent(CargarOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
