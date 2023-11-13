import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/services/administrador/AdminService';
import { ActualizarNavbarService } from 'src/services/solcitante/ActualizarNavbarService';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
import { UsuarioService } from 'src/services/usuario/UsuarioService';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {
  nombreVistaPagina !: String;
  completarInfo!:boolean;
  siguientePagina!: String;

  constructor(private usuarioService: UsuarioService, 
    private router :Router, 
    private solicitanteService : SolicitanteService,
    private sharedService : ActualizarNavbarService,
    private adminService : AdminService) {}

  ngOnInit(): void {
    this.sharedService.completarInfo$.subscribe((value) => {
      this.completarInfo = value;
    }); 
    this.nombreVistaPagina = this.solicitanteService.nombrePagina('completar');
  }

  cambiarPagina(pagina : String){
    this.nombreVistaPagina = this.adminService.nombrePagina(pagina);
    this.siguientePagina = this.adminService.elegirPagina(pagina);
    console.log(this.siguientePagina)
    this.router.navigate([this.siguientePagina]);
  }

  close(): void {
      this.usuarioService.cerrarSesion().subscribe({
        next: (data:any) => {
          this.router.navigate(['./login']);
      },
      error: (error: any) => {
        console.log("error" + error);
      }
    });
  }
}
