import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisarPostulacionesComponent } from './revisar-postulaciones.component';

describe('RevisarPostulacionesComponent', () => {
  let component: RevisarPostulacionesComponent;
  let fixture: ComponentFixture<RevisarPostulacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisarPostulacionesComponent]
    });
    fixture = TestBed.createComponent(RevisarPostulacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
