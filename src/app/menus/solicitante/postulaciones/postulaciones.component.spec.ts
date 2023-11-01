import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulacionesComponent } from './postulaciones.component';

describe('PostulacionesComponent', () => {
  let component: PostulacionesComponent;
  let fixture: ComponentFixture<PostulacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostulacionesComponent]
    });
    fixture = TestBed.createComponent(PostulacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
