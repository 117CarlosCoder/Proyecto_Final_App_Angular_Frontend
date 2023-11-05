import { Component } from '@angular/core';
import { Entrevista } from 'src/entities/Entrevista';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrevistas',
  templateUrl: './entrevistas.component.html',
  styleUrls: ['./entrevistas.component.css']
})
export class EntrevistasComponent {
  listarEntrevistas!:Entrevista[];

  constructor(private solicitanteService: SolicitanteService,
    private router:Router){

  }

  ngOnInit(){
    this.solicitanteService.listaEntrevista().subscribe({
      next: (list: Entrevista[]) => {
        console.log("Cargar Entrevistas")
        this.listarEntrevistas = list;
        console.log(this.listarEntrevistas);
      }
    });
  }


  masInformacion(codigo: number){
    this.router.navigate(['solicitante-cargar-oferta-info',{codigo:codigo}]);
  }

}
