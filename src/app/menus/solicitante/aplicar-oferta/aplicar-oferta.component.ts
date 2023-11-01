import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/entities/Ofertas';
import { ActualizarNavbarService } from 'src/services/solcitante/ActualizarNavbarService';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
@Component({
  selector: 'app-aplicar-oferta',
  templateUrl: './aplicar-oferta.component.html',
  styleUrls: ['./aplicar-oferta.component.css']
})
export class AplicarOfertaComponent implements OnInit {
  listaOfertas !: Ofertas[];

  constructor(private sharedService :ActualizarNavbarService, private solicitanteService: SolicitanteService){

  }

  ngOnInit(): void{
    this.sharedService.updateCompletarInfo(false);
    this.solicitanteService.listarOfertas().subscribe({
      next: (list: Ofertas[]) => {
        console.log("Cargar ofertas")
        this.listaOfertas = list;
        console.log(this.listaOfertas);
      }
  });
  }
  
}
  

