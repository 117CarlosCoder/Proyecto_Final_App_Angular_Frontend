import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaNoPermitidaComponent } from './pagina-no-permitida.component';

describe('PaginaNoPermitidaComponent', () => {
  let component: PaginaNoPermitidaComponent;
  let fixture: ComponentFixture<PaginaNoPermitidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaNoPermitidaComponent]
    });
    fixture = TestBed.createComponent(PaginaNoPermitidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
