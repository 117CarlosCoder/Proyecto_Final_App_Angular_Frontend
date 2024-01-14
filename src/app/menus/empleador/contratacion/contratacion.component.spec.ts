import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratacionComponent } from './contratacion.component';

describe('ContratacionComponent', () => {
  let component: ContratacionComponent;
  let fixture: ComponentFixture<ContratacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContratacionComponent]
    });
    fixture = TestBed.createComponent(ContratacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
