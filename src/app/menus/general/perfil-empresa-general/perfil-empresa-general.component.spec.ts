import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEmpresaGeneralComponent } from './perfil-empresa-general.component';

describe('PerfilEmpresaGeneralComponent', () => {
  let component: PerfilEmpresaGeneralComponent;
  let fixture: ComponentFixture<PerfilEmpresaGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilEmpresaGeneralComponent]
    });
    fixture = TestBed.createComponent(PerfilEmpresaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
