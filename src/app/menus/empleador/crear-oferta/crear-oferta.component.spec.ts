import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOfertaComponent } from './crear-oferta.component';

describe('CrearOfertaComponent', () => {
  let component: CrearOfertaComponent;
  let fixture: ComponentFixture<CrearOfertaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearOfertaComponent]
    });
    fixture = TestBed.createComponent(CrearOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
