import { Component } from '@angular/core';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
import { Router } from '@angular/router';
import { EntrevistaN } from 'src/entities/EntrevistaN';

@Component({
  selector: 'app-entrevistas',
  templateUrl: './entrevistas.component.html',
  styleUrls: ['./entrevistas.component.css']
})
export class EntrevistasComponent {
  listarEntrevistas!:EntrevistaN[];
  carga:boolean=false;

  constructor(private solicitanteService: SolicitanteService,
    private router:Router){

  }

  ngOnInit(){
    this.solicitanteService.listaEntrevista().subscribe({
      next: (list: EntrevistaN[]) => {
        console.log("Cargar Entrevistas")
        this.listarEntrevistas = list;
        console.log(this.listarEntrevistas);
        if(list.length !== 0){
          this.carga=true;
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


  masInformacion(codigo: number){
    this.router.navigate(['solicitante-cargar-oferta-info',{codigo:codigo}]);
  }

}
