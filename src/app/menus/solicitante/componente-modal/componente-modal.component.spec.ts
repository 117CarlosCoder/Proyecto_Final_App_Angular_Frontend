import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteModalComponent } from './componente-modal.component';

describe('ComponenteModalComponent', () => {
  let component: ComponenteModalComponent;
  let fixture: ComponentFixture<ComponenteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteModalComponent]
    });
    fixture = TestBed.createComponent(ComponenteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
