import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CargarOfertasFechas } from 'src/entities/CargarOfertasFechas';
import { Codigo } from 'src/entities/Codigo';
import { OfertaInformacion } from 'src/entities/OfertaInformacion';
import { OfertaInvitado } from 'src/entities/OfertaInvitado';
import { OfertasDate } from 'src/entities/OfertasDate';
import { InvitadoService } from 'src/services/invitado/InvitadoService';

@Component({
  selector: 'app-perfil-empresa',
  templateUrl: './perfil-empresa.component.html',
  styleUrls: ['./perfil-empresa.component.css']
})
export class PerfilEmpresaComponent {
  codigo !: number;
  oferta !: OfertaInformacion;
  cargar !: boolean;

  cargarEmpresa !: boolean;
  valor : boolean = true;
  form!:FormGroup;
  listarOfetas!:OfertasDate[];
  codigoFinal!: Codigo;
  Fecha!: string | null;
  pipe = new DatePipe('en-US');
  FechaOFerta !: CargarOfertasFechas;
  listarFechas = [{
    "nombre":'Fecha Publcacion',
    "valor":'fechaPublicacion' 
  }, 
  {
    "nombre":'Fecha Limite',
    "valor":'fechaLimite'
  }];

  constructor(private router:Router,
     private invitadoService: InvitadoService,
     private route: ActivatedRoute){}

     ngOnInit() {

      this.route.params.subscribe(params => {
        const valorRecibido = params['codigo'];
        this.codigo = valorRecibido;
        console.log(this.codigo)
      });

      this.invitadoService.listarEmpresa(this.codigo).subscribe({
        next: (valor: OfertaInformacion) => {
          var list: OfertaInformacion | null= null; 
          if (valor) {
            list = valor;
            this.oferta = list;
            this.cargarEmpresa=true;
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
      
      this.invitadoService.listarOfertasEmpresa(this.codigo).subscribe({
        next: (valor: OfertasDate[]) => {
          console.log("Cargar Ofertas")
          var list: OfertasDate[] | null= null; 
            if (valor) {
              list = valor;
              this.listarOfetas = list;
              
              list.forEach(element => {
            if(element.fechaPublicacion!=null){
              this.Fecha = this.pipe.transform(element.fechaPublicacion.toString(), 'yyyy-MM-dd');
    
              console.log(this.Fecha?.toString());
              if(this.Fecha){
                element.fechaPublicacion = this.Fecha;
              }
            }
    
            if(element.fechaLimite!=null){
              this.Fecha = this.pipe.transform(element.fechaLimite.toString(), 'yyyy-MM-dd');
    
              console.log(this.Fecha?.toString());
              if(this.Fecha){
                element.fechaLimite = this.Fecha;
              }
            }
          });
          console.log(this.listarOfetas);
            }
          this.cargar = true;
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


     masInformacion(codigo:number){
      this.router.navigate(['empleos-mas-info',{codigo:codigo}]);
    }

    regresar(){
      this.router.navigate(['solicitante-aplicar-oferta']);
    }
}
