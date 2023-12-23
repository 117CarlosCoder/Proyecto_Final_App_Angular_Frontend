import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { ActualizarNavbarService } from 'src/services/solcitante/ActualizarNavbarService';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
import { UsuarioService } from 'src/services/usuario/UsuarioService';

@Component({
  selector: 'app-navbar-empleador',
  templateUrl: './navbar-empleador.component.html',
  styleUrls: ['./navbar-empleador.component.css']
})
export class NavbarEmpleadorComponent {
  nombreVistaPagina !: String;
  completarInfo!:boolean;
  siguientePagina!: String;

  constructor(private usuarioService: UsuarioService, private router :Router, private empleadorService : EmpleadorService,private sharedService : ActualizarNavbarService) {}

  ngOnInit(): void {
    this.sharedService.completarInfo$.subscribe((value) => {
      this.completarInfo = value;
    }); 
    this.nombreVistaPagina = this.empleadorService.nombrePagina('completar');
  }

  cambiarPagina(pagina : String){
    this.nombreVistaPagina = this.empleadorService.nombrePagina(pagina);
    this.siguientePagina = this.empleadorService.elegirPagina(pagina);
    console.log(this.siguientePagina)
    this.router.navigate([this.siguientePagina]);
  }

  close(): void {
      this.usuarioService.cerrarSesion().subscribe({
        next: (data:any) => {
          this.router.navigate(['./login']);
          localStorage.removeItem('username');
          localStorage.removeItem('password');
          localStorage.setItem('rol','Invitado');
      },
      error: (error: any) => {
        console.log("error" + error);
      }
    });
  }
}
