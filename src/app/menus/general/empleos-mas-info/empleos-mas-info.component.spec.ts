import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleosMasInfoComponent } from './empleos-mas-info.component';

describe('EmpleosMasInfoComponent', () => {
  let component: EmpleosMasInfoComponent;
  let fixture: ComponentFixture<EmpleosMasInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpleosMasInfoComponent]
    });
    fixture = TestBed.createComponent(EmpleosMasInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
