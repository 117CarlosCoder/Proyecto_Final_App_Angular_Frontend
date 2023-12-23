import { Component, Injectable } from '@angular/core';
import { UsuarioService } from 'src/services/usuario/UsuarioService';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
import { Router } from '@angular/router';
import { ActualizarNavbarService } from 'src/services/solcitante/ActualizarNavbarService';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-navbar-solicitante',
  templateUrl: './navbar-solicitante.component.html',
  styleUrls: ['./navbar-solicitante.component.css']
})

export class NavbarSolicitanteComponent {
  nombreVistaPagina !: String;
  completarInfo!:boolean;
  siguientePagina!: String;

  constructor(private usuarioService: UsuarioService, private router :Router, private solicitanteService : SolicitanteService,private sharedService : ActualizarNavbarService) {}

  ngOnInit(): void {
    this.sharedService.completarInfo$.subscribe((value) => {
      this.completarInfo = value;
    }); 
    this.nombreVistaPagina = this.solicitanteService.nombrePagina('completar');
  }

  cambiarPagina(pagina : String){
    console.log(pagina)
    this.nombreVistaPagina = this.solicitanteService.nombrePagina(pagina);
    this.siguientePagina = this.solicitanteService.elegirPagina(pagina);
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
