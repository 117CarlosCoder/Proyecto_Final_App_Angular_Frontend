import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postulacion } from 'src/entities/Postulacion';
import { Postulante } from 'src/entities/Postulante';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';

@Component({
  selector: 'app-postulantes-oferta',
  templateUrl: './postulantes-oferta.component.html',
  styleUrls: ['./postulantes-oferta.component.css']
})
export class PostulantesOfertaComponent {
  listarPostulantes!:Postulante[];
  codigo!:number;
  cargar:boolean = false;

  constructor(private empleadorService : EmpleadorService,
    private router : Router,
    private route : ActivatedRoute){}

  ngOnInit(): void {
    this.cargar =false;
   
    this.route.params.subscribe(params => {
      const valorRecibido = params['codigo'];
      this.codigo = valorRecibido;
      console.log(this.codigo)
    });

    


    this.empleadorService.listarPostulantes(this.codigo).subscribe({
      next: (response: HttpResponse<Postulante[]>) => {
          this.cargar= true;
          console.log("Cargar Ofertas")
          var list: Postulante[] | null= null; 
          if (response.body) {
            list = response.body;
            this.listarPostulantes = list;
            console.log(this.listarPostulantes);
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

  seleccionarPostulante(codigo:number, oferta:number){
    this.router.navigate(['datos-postulantes',{codigo:codigo, oferta:oferta}]);
  }
}
