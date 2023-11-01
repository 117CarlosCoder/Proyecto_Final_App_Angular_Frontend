import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActualizarNavbarService {
  private completarInfoSubject = new BehaviorSubject<boolean>(false);
  completarInfo$: Observable<boolean> = this.completarInfoSubject.asObservable();

  updateCompletarInfo(value: boolean) {
    this.completarInfoSubject.next(value);
  }
}
