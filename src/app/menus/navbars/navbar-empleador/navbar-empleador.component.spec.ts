import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarEmpleadorComponent } from './navbar-empleador.component';

describe('NavbarEmpleadorComponent', () => {
  let component: NavbarEmpleadorComponent;
  let fixture: ComponentFixture<NavbarEmpleadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarEmpleadorComponent]
    });
    fixture = TestBed.createComponent(NavbarEmpleadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
