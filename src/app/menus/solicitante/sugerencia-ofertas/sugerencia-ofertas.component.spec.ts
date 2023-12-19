import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugerenciaOfertasComponent } from './sugerencia-ofertas.component';

describe('SugerenciaOfertasComponent', () => {
  let component: SugerenciaOfertasComponent;
  let fixture: ComponentFixture<SugerenciaOfertasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SugerenciaOfertasComponent]
    });
    fixture = TestBed.createComponent(SugerenciaOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
