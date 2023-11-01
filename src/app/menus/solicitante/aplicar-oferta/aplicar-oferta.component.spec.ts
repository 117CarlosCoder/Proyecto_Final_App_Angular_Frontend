import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AplicarOfertaComponent } from './aplicar-oferta.component';

describe('AplicarOfertaComponent', () => {
  let component: AplicarOfertaComponent;
  let fixture: ComponentFixture<AplicarOfertaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AplicarOfertaComponent]
    });
    fixture = TestBed.createComponent(AplicarOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
