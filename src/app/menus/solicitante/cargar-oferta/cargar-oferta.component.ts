import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Ofertas } from 'src/entities/Ofertas';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';

@Component({
  selector: 'app-cargar-oferta',
  templateUrl: './cargar-oferta.component.html',
  styleUrls: ['./cargar-oferta.component.css']
})
export class CargarOfertaComponent implements OnInit{
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

  aplicar(codigo:number){
    this.router.navigate(['solicitante-aplicar-empleo',{codigo:codigo}]);
  }
}

