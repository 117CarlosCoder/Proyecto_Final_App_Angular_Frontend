import { Component } from '@angular/core';
import { UsuarioService } from 'src/services/usuario/UsuarioService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-no-permitida',
  templateUrl: './pagina-no-permitida.component.html',
  styleUrls: ['./pagina-no-permitida.component.css']
})

export class PaginaNoPermitidaComponent {
  rol!:string;

  constructor(private usuarioService : UsuarioService,
    private router : Router
    ) {
      var storedRol = localStorage.getItem('rol');
      if (storedRol === null) {
        localStorage.setItem('rol','Invitado');
      }
      storedRol = localStorage.getItem('rol');
      this.rol = storedRol!== null ? storedRol : 'Invitado';
  }

  goBack() {
    var storedRol = localStorage.getItem('rol');
      if (storedRol === null) {
        localStorage.setItem('rol','Invitado');
      }
      storedRol = localStorage.getItem('rol');
      this.rol = storedRol!== null ? storedRol : 'Invitado';
    this.router.navigate([this.usuarioService.paginaInicial(this.rol)]);
  }
}
