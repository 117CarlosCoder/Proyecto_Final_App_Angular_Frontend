import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestablecerContrasenaComponent } from './restablecer-contrasena.component';

describe('RestablecerContrasenaComponent', () => {
  let component: RestablecerContrasenaComponent;
  let fixture: ComponentFixture<RestablecerContrasenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestablecerContrasenaComponent]
    });
    fixture = TestBed.createComponent(RestablecerContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
