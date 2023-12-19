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

  constructor(private empleadorService : EmpleadorService,
    private router : Router,
    private route : ActivatedRoute){}

  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      const valorRecibido = params['codigo'];
      this.codigo = valorRecibido;
      console.log(this.codigo)
    });

    


    this.empleadorService.listarPostulantes(this.codigo).subscribe({
      next: (list: Postulante[]) => {
          console.log("Cargar Ofertas")
          this.listarPostulantes = list;
          console.log(this.listarPostulantes);
      }
    });
  }

  seleccionarPostulante(codigo:number, oferta:number){
    this.router.navigate(['datos-postulantes',{codigo:codigo, oferta:oferta}]);
  }
}
