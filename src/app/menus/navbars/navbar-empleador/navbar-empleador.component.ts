import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Notificaciones } from 'src/entities/Notificaciones';
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
  notificaciones!: Notificaciones[];

  constructor(private usuarioService: UsuarioService, private router :Router, private empleadorService : EmpleadorService,private sharedService : ActualizarNavbarService) {}

  ngOnInit(): void {
    this.sharedService.completarInfo$.subscribe((value) => {
      this.completarInfo = value;
    }); 
    this.nombreVistaPagina = this.empleadorService.nombrePagina('completar');
    this.usuarioService.listarNotificaciones().subscribe({
      next:(data:Notificaciones[])=>{
        console.log(data)
        this.notificaciones = data;
      },
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        }else {
          console.error('Error en la solicitud:', error);
        }
      }
    });
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
          this.usuarioService.removeCredenciales();
          this.usuarioService.setRol('Invitado');
          this.router.navigate(['./login']);
          
      },
      error: (error: any) => {
        console.log("error" + error);
      }
    });
  }
}
