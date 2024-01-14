import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulantesEntrevistaComponent } from './postulantes-entrevista.component';

describe('PostulantesEntrevistaComponent', () => {
  let component: PostulantesEntrevistaComponent;
  let fixture: ComponentFixture<PostulantesEntrevistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostulantesEntrevistaComponent]
    });
    fixture = TestBed.createComponent(PostulantesEntrevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
