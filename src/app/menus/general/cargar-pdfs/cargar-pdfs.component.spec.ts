import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarPdfsComponent } from './cargar-pdfs.component';

describe('CargarPdfsComponent', () => {
  let component: CargarPdfsComponent;
  let fixture: ComponentFixture<CargarPdfsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarPdfsComponent]
    });
    fixture = TestBed.createComponent(CargarPdfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
