import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dashboard } from 'src/entities/Dashboar';
import { AdminService } from 'src/services/administrador/AdminService';
import { SessionService } from 'src/services/sesion/SessionService';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  vistaDashboard !: Dashboard;
  carga!:boolean;

  constructor(private adminService:AdminService,
    private sessionService : SessionService,
    private router : Router){}

  ngOnInit(): void {
    this.carga = false;
    
    this.adminService.listarDashboard({headers : new HttpHeaders().set('X-Angular-Session-Id', this.sessionService.getSessionIdFromCookie())}).subscribe({
      next: (list: Dashboard) => {
        this.vistaDashboard = list;
        this.carga = true;
        
      }
    },
    );

  }

  gestionarUsuarios(){
    this.router.navigate(['admin-usuarios']);
  }

}