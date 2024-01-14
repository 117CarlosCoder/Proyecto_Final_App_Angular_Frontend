import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertaInvitado } from 'src/entities/OfertaInvitado';
import { Ofertas } from 'src/entities/Ofertas';
import { InvitadoService } from 'src/services/invitado/InvitadoService';

@Component({
  selector: 'app-empleos-mas-info',
  templateUrl: './empleos-mas-info.component.html',
  styleUrls: ['./empleos-mas-info.component.css']
})
export class EmpleosMasInfoComponent {
  codigo !: number;
  empresa !: number;
  oferta !: OfertaInvitado;
  valorEmpresa !: number;
  cargar !: boolean;
  valor : boolean = true;

  constructor(private router:Router,
     private route: ActivatedRoute,
     private invitadoService: InvitadoService){}

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
    this.invitadoService.listarOferta(this.codigo.toString(), this.valor).subscribe({
      next: (list: OfertaInvitado) => {
        console.log("Cargar oferta")
        this.oferta = list;
        console.log(this.oferta);
        this.valorEmpresa = list.codigoEmpresa;
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

  PerfilEmpresa(){
    this.router.navigate(['perfil-empresa-general',{codigo:this.valorEmpresa}]);
  }

}

