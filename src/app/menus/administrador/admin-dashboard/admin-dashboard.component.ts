import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dashboard } from 'src/entities/Dashboar';
import { AdminService } from 'src/services/administrador/AdminService';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  vistaDashboard !: Dashboard;
  carga!:boolean;

  constructor(private adminService:AdminService,
    private router : Router){}

  ngOnInit(): void {
    this.carga = false;
    
    this.adminService.listarDashboard().subscribe({
      next: (response: HttpResponse<Dashboard>) => {
        console.log(response.status)
        
        var list: Dashboard | null = null; 
          if (response.body) {
            list = response.body;
            this.vistaDashboard = list;
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
    },
    );

  }

  gestionarUsuarios(rol:String){
    this.router.navigate(['admin-usuarios',{rol:rol}]);
  }

}