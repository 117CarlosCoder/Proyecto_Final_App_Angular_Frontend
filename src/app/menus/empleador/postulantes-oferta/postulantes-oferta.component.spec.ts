import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulantesOfertaComponent } from './postulantes-oferta.component';

describe('PostulantesOfertaComponent', () => {
  let component: PostulantesOfertaComponent;
  let fixture: ComponentFixture<PostulantesOfertaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostulantesOfertaComponent]
    });
    fixture = TestBed.createComponent(PostulantesOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
