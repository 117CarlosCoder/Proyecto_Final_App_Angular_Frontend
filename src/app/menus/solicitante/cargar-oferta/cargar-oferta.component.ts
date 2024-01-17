import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OfertaInvitado } from 'src/entities/OfertaInvitado';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';

@Component({
  selector: 'app-cargar-oferta',
  templateUrl: './cargar-oferta.component.html',
  styleUrls: ['./cargar-oferta.component.css']
})
export class CargarOfertaComponent implements OnInit{
  codigo !: number;
  oferta !: OfertaInvitado;
  cargar !: boolean;
  valor : boolean = true;
  valorEmpresa !: number;
 

  constructor(private router:Router,
     private route: ActivatedRoute,
     private solicitanteService:SolicitanteService){}

ngOnInit() {
    this.cargar=false;

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

    console.log(this.codigo)
    this.solicitanteService.listarOfertCodigo(this.codigo).subscribe({
      next: (list: OfertaInvitado) => {
        console.log("Cargar oferta")
        this.oferta = list;
        this.valorEmpresa = this.oferta.codigoEmpresa;
        console.log(this.oferta);
        this.cargar=true;
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

  aplicar(codigo:number){
    this.router.navigate(['solicitante-aplicar-empleo',{codigo:codigo}]);
  }


  PerfilEmpresa(){
    this.router.navigate(['solicitante-perfil-empresa',{codigo:this.valorEmpresa}]);
  }

  regresar(){
    this.router.navigate(['solicitante-aplicar-oferta']);
  }
}

