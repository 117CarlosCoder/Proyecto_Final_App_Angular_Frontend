import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  checkboxState: boolean[] = [];

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
      next: (response: HttpResponse<UsuarioT[]>) => {
        var list:UsuarioT[] | null= null; 
          if (response.body) {
            list = response.body;
            this.listarUsuarios = list;
            console.log(this.listarUsuarios)
          }
        
        
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


  crearUsuario(){
    this.router.navigate(['admin-crear-usuarios',{rol:this.rol}]);
  }

  editarUsuario(codigo:number){
    this.router.navigate(['admin-editar-usuarios',{rol:this.rol, codigo:codigo}]);
  }

  eliminarUsuario(username:String){
    this.adminService.eliminarUsuario(username).subscribe({
      next:(response: HttpResponse<any>) => {
        console.log("Eliminado");
        this.adminService.listarUsuarios(this.rol).subscribe({
          next: (response: HttpResponse<UsuarioT[]>) => {
            if(response.status === 406){
              this.router.navigate(['**']);
            }
            var list:UsuarioT[] | null= null; 
              if (response.body) {
                list = response.body;
                this.listarUsuarios = list;
                console.log(this.listarUsuarios)
              }
            
            
          }
        });
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

  suspenderUsuario(username : String, event : any){
    console.log(event.target.checked)
    this.adminService.suspender(username,event.target.checked).
    subscribe({
      next:(data: any ) => {
        console.log("usuario suspendido")
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

  cancelar(){
    this.router.navigate(['admin-dashboard']);
  }

}
