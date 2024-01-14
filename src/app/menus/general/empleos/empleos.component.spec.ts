import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleosComponent } from './empleos.component';

describe('EmpleosComponent', () => {
  let component: EmpleosComponent;
  let fixture: ComponentFixture<EmpleosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleosComponent]
    });
    fixture = TestBed.createComponent(EmpleosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
