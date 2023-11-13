import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComisionComponent } from './admin-comision.component';

describe('AdminComisionComponent', () => {
  let component: AdminComisionComponent;
  let fixture: ComponentFixture<AdminComisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComisionComponent]
    });
    fixture = TestBed.createComponent(AdminComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
