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
      next: (list: Categoria[]) => {
        this.listarCategoria = list;
        this.carga = true;
      }
    });
  }

  editarCategoria(codigo:number){
    this.router.navigate(['editar-categoria', {codigo:codigo}]);
  }

  crearCategoria(){
    this.router.navigate(['crear-categoria']);
  }
}
