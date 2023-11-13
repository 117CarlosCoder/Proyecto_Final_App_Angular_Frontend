import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarEntrevistaComponent } from './generar-entrevista.component';

describe('GenerarEntrevistaComponent', () => {
  let component: GenerarEntrevistaComponent;
  let fixture: ComponentFixture<GenerarEntrevistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerarEntrevistaComponent]
    });
    fixture = TestBed.createComponent(GenerarEntrevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
