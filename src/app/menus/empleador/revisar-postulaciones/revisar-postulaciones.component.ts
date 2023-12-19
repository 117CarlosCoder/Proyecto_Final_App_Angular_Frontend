import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Ofertas } from 'src/entities/Ofertas';
import { OfertasDate } from 'src/entities/OfertasDate';
import { Postulacion } from 'src/entities/Postulacion';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';

@Component({
  selector: 'app-revisar-postulaciones',
  templateUrl: './revisar-postulaciones.component.html',
  styleUrls: ['./revisar-postulaciones.component.css']
})
export class RevisarPostulacionesComponent implements OnInit{
  listaOferta!:OfertasDate[];
  Fecha!: string | null;
  pipe = new DatePipe('en-US');

  constructor(private empleadorService : EmpleadorService,
    private router:Router){}


  ngOnInit(): void {
   
    this.empleadorService.listarOfertasPostulacion().subscribe({
      next: (list: OfertasDate[]) => {
          console.log("Cargar Ofertas")
          this.listaOferta = list;
          list.forEach(element => {
            if(element.fechaPublicacion!=null){
              this.Fecha = this.pipe.transform(element.fechaPublicacion.toString(), 'yyyy-MM-dd');

              console.log(this.Fecha?.toString());
              if(this.Fecha){
                element.fechaPublicacion = this.Fecha;
              }
            }

            if(element.fechaLimite!=null){
              this.Fecha = this.pipe.transform(element.fechaLimite.toString(), 'yyyy-MM-dd');

              console.log(this.Fecha?.toString());
              if(this.Fecha){
                element.fechaLimite = this.Fecha;
              }
            }
          });
          console.log(this.listaOferta);
      }
    });
  }
  
 
  seleccionarPostulante(codigo:number){
    this.router.navigate(["empleador-postulantes",{codigo:codigo}]);
  }

}
