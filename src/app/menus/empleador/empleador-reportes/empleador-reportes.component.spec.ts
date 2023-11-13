import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadorReportesComponent } from './empleador-reportes.component';

describe('EmpleadorReportesComponent', () => {
  let component: EmpleadorReportesComponent;
  let fixture: ComponentFixture<EmpleadorReportesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleadorReportesComponent]
    });
    fixture = TestBed.createComponent(EmpleadorReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
