import { HttpResponse } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EntrevistaFinal } from 'src/entities/EntrevistaFinal';
import { Ofertas } from 'src/entities/Ofertas';
import { OfertasDate } from 'src/entities/OfertasDate';
import { Postulante } from 'src/entities/Postulante';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { UsuarioService } from 'src/services/usuario/UsuarioService';

@Component({
  selector: 'app-mensaje-eliminar-oferta',
  templateUrl: './mensaje-eliminar-oferta.component.html',
  styleUrls: ['./mensaje-eliminar-oferta.component.css']
})
export class MensajeEliminarOfertaComponent {
  form!:FormGroup;
  codigo!:number;
  usuario!:number;
  oferta!:number;
  finalizarInfoEntrevista!:EntrevistaFinal;
  modalRef?: BsModalRef;
  cargar:boolean=false;
  listarPostulantes!:Postulante[];

  constructor(private empleadorService : EmpleadorService,
    private formBuilder: FormBuilder,
    private route : ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private usuarioService: UsuarioService){}

    ngOnInit(): void {

      this.route.params.subscribe(params => {
        const valorRecibido = params['codigo'];
        this.codigo = valorRecibido;
        console.log(this.codigo)
        const valorUsuario = params['usuario'];
        this.usuario = valorUsuario;
        console.log(this.usuario)
        const valorOferta = params['oferta'];
        this.oferta = valorOferta;
        console.log(this.oferta)
      });
  
      this.form = this.formBuilder.group({
        codigo: [this.codigo],
        usuario: [this.usuario],
        notas: [null, [Validators.required]],
        codigoOferta: [this.oferta],
      });


      this.empleadorService.listarPostulantes(this.codigo).subscribe({
        next: (response: HttpResponse<Postulante[]>) => {
            this.cargar= true;
            console.log("Cargar Ofertas")
            var list: Postulante[] | null= null; 
            if (response.body) {
              list = response.body;
              this.listarPostulantes = list;
              console.log(this.listarPostulantes);
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



  eliminarOferta( template: TemplateRef<any>, template2: TemplateRef<any>){
    this.finalizarInfoEntrevista = this.form.value as EntrevistaFinal;
    this.empleadorService.eliminarOferta(this.codigo).subscribe({
      next:(response: HttpResponse<Ofertas>) => {
          console.log("Eliminado");
          this.listarPostulantes.forEach(postulante=>{
            this.empleadorService.crearNotificacion(this.finalizarInfoEntrevista.notas, postulante.codigo).subscribe({
              next:(data:any)=>{
                
              },
              error: (error) => {
                if(error.status === 406){
                  this.router.navigate(['**']);
                }
                if(error.status === 400){
                  this.modalRef = this.modalService.show(template2);
                }else {
                  console.error('Error en la solicitud:', error);
                }
              }
              
          });
          })
          
          this.modalRef = this.modalService.show(template);
                this.router.navigate(['empleador-gestion']);
      },
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        }
        if(error.status === 400){
          this.modalRef = this.modalService.show(template2);
        }else {
          console.error('Error en la solicitud:', error);
        }
      }
  });
  }
}
