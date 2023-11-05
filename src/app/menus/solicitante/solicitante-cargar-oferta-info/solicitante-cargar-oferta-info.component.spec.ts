import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitanteCargarOfertaInfoComponent } from './solicitante-cargar-oferta-info.component';

describe('SolicitanteCargarOfertaInfoComponent', () => {
  let component: SolicitanteCargarOfertaInfoComponent;
  let fixture: ComponentFixture<SolicitanteCargarOfertaInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitanteCargarOfertaInfoComponent]
    });
    fixture = TestBed.createComponent(SolicitanteCargarOfertaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
