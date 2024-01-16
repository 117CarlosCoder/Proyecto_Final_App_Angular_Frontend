import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEmpresaMasInfoComponent } from './perfil-empresa-mas-info.component';

describe('PerfilEmpresaMasInfoComponent', () => {
  let component: PerfilEmpresaMasInfoComponent;
  let fixture: ComponentFixture<PerfilEmpresaMasInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilEmpresaMasInfoComponent]
    });
    fixture = TestBed.createComponent(PerfilEmpresaMasInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
