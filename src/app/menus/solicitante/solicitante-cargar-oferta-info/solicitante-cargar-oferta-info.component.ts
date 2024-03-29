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
  valor !: boolean;
  carga : boolean = false;

  constructor(private router:Router,
     private route: ActivatedRoute,
     private solicitanteService:SolicitanteService){}

ngOnInit() {
    this.route.params.subscribe(params => {
      const valorRecibido = params['codigo'];
      this.codigo = valorRecibido;
      console.log(this.codigo)
    });

    this.route.params.subscribe(params => {
      const valorRecibido = params['valor'];
      if (valorRecibido) {
        this.valor = valorRecibido;
        console.log(this.valor)
      }
      
    });

    console.log(this.codigo);
    this.solicitanteService.listarOferta(this.codigo.toString(), true).subscribe({
      next: (list: Ofertas) => {
        console.log("Cargar oferta")
        this.oferta = list;
        console.log(this.oferta);
        this.carga = true;
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

  PerfilEmpresa(){
    this.router.navigate(['solicitante-perfil-empresa',{codigo:this.codigo}]);
  }

  regresar(){
    this.router.navigate(['solicitante-entrevistas']);
  }

}
