import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/entities/Categoria';
import { AdminService } from 'src/services/administrador/AdminService';

@Component({
  selector: 'app-admin-gestion',
  templateUrl: './admin-gestion.component.html',
  styleUrls: ['./admin-gestion.component.css']
})
export class AdminGestionComponent implements OnInit{
  listarCategoria!:Categoria[];  
  carga!:boolean;  

  constructor(private adminService:AdminService,
    private router: Router){} 

  ngOnInit(): void {
    this.carga=false;
    this.adminService.listarCategorias().subscribe({
      next: (response: HttpResponse<Categoria[]>) => {
        var list: Categoria[] | null= null; 
          if (response.body) {
            list = response.body;
            this.listarCategoria = list;
            this.carga = true;
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

  editarCategoria(codigo:number){
    this.router.navigate(['editar-categoria', {codigo:codigo}]);
  }

  eliminarCategoria(codigo:number){
    this.adminService.eliminarCategoria(codigo).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log("categoria eliminada")
        this.adminService.listarCategorias().subscribe({
          next: (response: HttpResponse<Categoria[]>) => {
            if(response.status === 406){
              this.router.navigate(['**']);
            }
            var list: Categoria[] | null= null; 
              if (response.body) {
                list = response.body;
                this.listarCategoria = list;
                this.carga = true;
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

  crearCategoria(){
    this.router.navigate(['crear-categoria']);
  }
}
