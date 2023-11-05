import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ofertas } from 'src/entities/Ofertas';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';

@Component({
  selector: 'app-solicitante-cargar-oferta-info',
  templateUrl: './solicitante-cargar-oferta-info.component.html',
  styleUrls: ['./solicitante-cargar-oferta-info.component.css']
})
export class SolicitanteCargarOfertaInfoComponent {
  codigo !: number;
  oferta !: Ofertas;

  constructor(private router:Router,
     private route: ActivatedRoute,
     private solicitanteService:SolicitanteService){}

ngOnInit() {
    this.route.params.subscribe(params => {
      const valorRecibido = params['codigo'];
      this.codigo = valorRecibido;
      console.log(this.codigo)
    });

    console.log(this.codigo)
    this.solicitanteService.listarOferta(this.codigo.toString()).subscribe({
      next: (list: Ofertas) => {
        console.log("Cargar oferta")
        this.oferta = list;
        console.log(this.oferta);
      }
    });
  }
}
