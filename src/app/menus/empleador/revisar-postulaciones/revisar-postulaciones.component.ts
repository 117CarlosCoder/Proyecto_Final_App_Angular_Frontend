import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfertasDate } from 'src/entities/OfertasDate';
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
      next: (response: HttpResponse<OfertasDate[]>) => {
          console.log("Cargar Ofertas")
          var list: OfertasDate[] | null= null; 
          if (response.body) {
            list = response.body;
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
          }
          console.log(this.listaOferta);
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
  
 
  seleccionarPostulante(codigo:number){
        this.router.navigate(["empleador-postulantes",{codigo:codigo}]);
    
    
  }

}
