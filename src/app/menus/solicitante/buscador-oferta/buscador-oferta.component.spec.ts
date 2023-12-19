import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorOfertaComponent } from './buscador-oferta.component';

describe('BuscadorOfertaComponent', () => {
  let component: BuscadorOfertaComponent;
  let fixture: ComponentFixture<BuscadorOfertaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscadorOfertaComponent]
    });
    fixture = TestBed.createComponent(BuscadorOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
