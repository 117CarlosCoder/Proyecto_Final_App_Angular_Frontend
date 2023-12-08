import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CrearUsuario } from 'src/entities/CrearUsuario';
import { Usuario } from 'src/entities/Usuario';
import { UsuarioT } from 'src/entities/UsuarioT';
import { AdminService } from 'src/services/administrador/AdminService';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit{
  rol!:String;
  listarUsuarios!:UsuarioT[];
  listarUsuario!:UsuarioT;

  constructor(private route:ActivatedRoute,
    private adminService: AdminService,
    private router:Router){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const rolRecibido = params['rol'];
      this.rol = rolRecibido;
      console.log(this.rol)
    });

    this.adminService.listarUsuarios(this.rol).subscribe({
      next: (list: UsuarioT[]) => {
        this.listarUsuarios = list;
        console.log(this.listarUsuarios)
        
      }
    });
  }


  crearUsuario(){
    this.router.navigate(['admin-crear-usuarios',{rol:this.rol}]);
  }

  editarUsuario(codigo:number){
    this.router.navigate(['admin-editar-usuarios',{rol:this.rol, codigo:codigo}]);
  }

  eliminarUsuario(username:String){
    this.adminService.eliminarUsuario(username).subscribe({
      next:() => {
        console.log("Eliminado");
        this.adminService.listarUsuarios(this.rol).subscribe({
          next: (list: UsuarioT[]) => {
            this.listarUsuarios = list;
            console.log(this.listarUsuarios)
            
          }
        });
    }
    });
  }

}
