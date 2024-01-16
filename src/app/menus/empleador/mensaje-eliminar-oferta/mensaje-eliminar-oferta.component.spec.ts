import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeEliminarOfertaComponent } from './mensaje-eliminar-oferta.component';

describe('MensajeEliminarOfertaComponent', () => {
  let component: MensajeEliminarOfertaComponent;
  let fixture: ComponentFixture<MensajeEliminarOfertaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MensajeEliminarOfertaComponent]
    });
    fixture = TestBed.createComponent(MensajeEliminarOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
