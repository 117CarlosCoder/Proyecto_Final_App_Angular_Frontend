import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarEntrevistaComponent } from './realizar-entrevista.component';

describe('RealizarEntrevistaComponent', () => {
  let component: RealizarEntrevistaComponent;
  let fixture: ComponentFixture<RealizarEntrevistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RealizarEntrevistaComponent]
    });
    fixture = TestBed.createComponent(RealizarEntrevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
