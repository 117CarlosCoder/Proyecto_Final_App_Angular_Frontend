import { ActivatedRouteSnapshot,Router, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
export type Rol = 'Administrador' | 'Solicitante' | 'Empleador' | 'Invitado';


export function hasRole(allowedRoles: Rol[]): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean => {
  const authService = inject(AuthService);
  var rol =localStorage.getItem('rol') as Rol;
  console.log("ROL : "+ rol)
  if (rol === null || rol === undefined) {
    console.log('Usuario no autenticado');
    return false;
  }
  
  const hasRole = allowedRoles.includes(rol);

  if (!hasRole) {
    console.log('Usuario no autenticado');
    inject(Router).navigate(['pagina-no-permitida']); 
  }

  return hasRole;
}
  
}


