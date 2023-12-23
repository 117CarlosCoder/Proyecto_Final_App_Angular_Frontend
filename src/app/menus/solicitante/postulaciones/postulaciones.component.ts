import { Component, OnInit } from '@angular/core';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
import { ActivatedRoute, Router } from '@angular/router';
import { Postulacion } from 'src/entities/Postulacion';
import { RegistroRetirada } from 'src/entities/RegistroRetirada';
import { DatePipe } from '@angular/common';
import { format } from 'date-fns';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent implements OnInit {
  listarPostulantes!:Postulacion[];
  crearPostulaciones!:RegistroRetirada;
  todayWithPipe!: String|null;
  pipe = new DatePipe('en-US');

  constructor(private solicitanteService: SolicitanteService, 
    private router:Router){}

  ngOnInit(): void {
    this.solicitanteService.listarPostulaciones().subscribe({
      next: (list: Postulacion[]) => {
        console.log("Cargar ofertas")
        this.listarPostulantes = list;
        console.log(this.listarPostulantes);
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
  
  eliminarPostulacion(dato:Postulacion){
    
      this.crearPostulaciones = {
        "codigo":0,
        "usuario":0,
        "oferta":dato.nombre,
        "fecha":format(Date.now(), 'yyyy-MM-dd')

      }; 
    /*let fechaFormateada2 = format(Date.now(), 'yyyy-MM-dd');
    console.log(fechaFormateada2)
    this.crearPostulaciones.fecha = format(Date.now(), 'yyyy-MM-dd');
    this.crearPostulaciones.oferta = dato.nombre;*/
   
    console.log(this.crearPostulaciones);
    this.solicitanteService.crearRegitroRetirada(this.crearPostulaciones).subscribe({
      next:(dato: any) => {
        
          console.log("Crer postulaciones")
       },
       error: (error) => {
         if(error.status === 406){
           this.router.navigate(['**']);
         }else {
           console.error('Error en la solicitud:', error);
         }
       }
    });  

  
    this.solicitanteService.elminarPostulacion(dato.codigo).subscribe({
          next:(value: Postulacion) => {
              console.log("Eliminado");
              this.solicitanteService.listarPostulaciones().subscribe({
                next: (list: Postulacion[]) => {
                    console.log("Cargar ofertas");
                    this.listarPostulantes = list;
                    console.log(this.listarPostulantes);
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

}
