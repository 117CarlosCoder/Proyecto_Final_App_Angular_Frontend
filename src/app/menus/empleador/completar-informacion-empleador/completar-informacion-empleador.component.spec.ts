import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarInformacionEmpleadorComponent } from './completar-informacion-empleador.component';

describe('CompletarInformacionEmpleadorComponent', () => {
  let component: CompletarInformacionEmpleadorComponent;
  let fixture: ComponentFixture<CompletarInformacionEmpleadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletarInformacionEmpleadorComponent]
    });
    fixture = TestBed.createComponent(CompletarInformacionEmpleadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
