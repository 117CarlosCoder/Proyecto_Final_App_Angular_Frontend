import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSolicitanteComponent } from './navbar-solicitante.component';

describe('NavbarSolicitanteComponent', () => {
  let component: NavbarSolicitanteComponent;
  let fixture: ComponentFixture<NavbarSolicitanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarSolicitanteComponent]
    });
    fixture = TestBed.createComponent(NavbarSolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
