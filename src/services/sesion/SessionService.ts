import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/entities/Usuario';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post('/login', { username, password });
  }

  setSessionIdInCookie(sessionId: Usuario): void {
    // Configurar la cookie con el identificador de sesión
    document.cookie = `sessionId=${sessionId}`;
  }

  getSessionIdFromCookie(): string {
    // Obtener el identificador de sesión de la cookie
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'sessionId') {
        return value;
      }
    }
    return '';
  }

  // Otros métodos relacionados con la sesión, como cerrar sesión, etc.
}
