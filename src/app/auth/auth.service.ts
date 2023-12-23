import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rol!:string;

  constructor() {
    var storedRol = localStorage.getItem('rol');
    console.log("Rol entrante : " + storedRol)
    if (storedRol === null) {
      localStorage.setItem('rol','Invitado');
    }
    if (storedRol === 'Invitado') {
      storedRol = localStorage.getItem('rol');
    }
    storedRol = localStorage.getItem('rol');
    this.rol = storedRol !== null ? storedRol : 'Invitado';

  }

  getRol(){
    return this.rol ;
  }
}
