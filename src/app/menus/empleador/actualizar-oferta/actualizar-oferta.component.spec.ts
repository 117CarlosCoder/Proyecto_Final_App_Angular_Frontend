import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarOfertaComponent } from './actualizar-oferta.component';

describe('ActualizarOfertaComponent', () => {
  let component: ActualizarOfertaComponent;
  let fixture: ComponentFixture<ActualizarOfertaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarOfertaComponent]
    });
    fixture = TestBed.createComponent(ActualizarOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
