import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilSolicitanteComponent } from './perfil-solicitante.component';

describe('PerfilSolicitanteComponent', () => {
  let component: PerfilSolicitanteComponent;
  let fixture: ComponentFixture<PerfilSolicitanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilSolicitanteComponent]
    });
    fixture = TestBed.createComponent(PerfilSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
