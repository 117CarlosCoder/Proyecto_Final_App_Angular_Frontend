import { Component, OnInit } from '@angular/core';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
import { ActivatedRoute } from '@angular/router';
import { Postulacion } from 'src/entities/Postulacion';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent implements OnInit {
  listarPostulantes!:Postulacion[];

  constructor(private solicitanteService: SolicitanteService){}

  ngOnInit(): void {
    this.solicitanteService.listarPostulaciones().subscribe({
      next: (list: Postulacion[]) => {
        console.log("Cargar ofertas")
        this.listarPostulantes = list;
        console.log(this.listarPostulantes);
      }
    }); 
  }
  
  eliminarPostulacion(codigo:number){
      this.solicitanteService.elminarPostulacion(codigo).subscribe({
          next:(value: Postulacion) => {
              console.log("Eliminado");
              this.solicitanteService.listarPostulaciones().subscribe({
                next: (list: Postulacion[]) => {
                    console.log("Cargar ofertas");
                    this.listarPostulantes = list;
                    console.log(this.listarPostulantes);
                }
            });
          },
      });

  }

}
