import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionEntrevistasComponent } from './revision-entrevistas.component';

describe('RevisionEntrevistasComponent', () => {
  let component: RevisionEntrevistasComponent;
  let fixture: ComponentFixture<RevisionEntrevistasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisionEntrevistasComponent]
    });
    fixture = TestBed.createComponent(RevisionEntrevistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
