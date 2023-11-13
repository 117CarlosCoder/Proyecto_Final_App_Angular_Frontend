import { Component, OnInit } from '@angular/core';
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

  constructor(private adminService:AdminService){}

  ngOnInit(): void {
    this.carga = false;
    this.adminService.listarDashboard().subscribe({
      next: (list: Dashboard) => {
        this.vistaDashboard = list;
        this.carga = true;
      }
    });

  }

}
