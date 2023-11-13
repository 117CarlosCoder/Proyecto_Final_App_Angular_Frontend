import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Ofertas } from 'src/entities/Ofertas';
import { Postulacion } from 'src/entities/Postulacion';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';

@Component({
  selector: 'app-revisar-postulaciones',
  templateUrl: './revisar-postulaciones.component.html',
  styleUrls: ['./revisar-postulaciones.component.css']
})
export class RevisarPostulacionesComponent implements OnInit{
  listaOferta!:Ofertas[];

  constructor(private empleadorService : EmpleadorService,
    private router:Router){}


  ngOnInit(): void {
   
    this.empleadorService.listarOfertas().subscribe({
      next: (list: Ofertas[]) => {
          console.log("Cargar Ofertas")
          this.listaOferta = list;
          console.log(this.listaOferta);
      }
    });
  }
  
 
  seleccionarPostulante(codigo:number){
    this.router.navigate(["empleador-postulantes",{codigo:codigo}]);
  }

}
