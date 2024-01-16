import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Categoria } from 'src/entities/Categoria';
import { Modalidad } from 'src/entities/Modalidad';
import { Ofertas } from 'src/entities/Ofertas';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-crear-oferta',
  templateUrl: './crear-oferta.component.html',
  styleUrls: ['./crear-oferta.component.css']
})
export class CrearOfertaComponent implements OnInit {
  form!:FormGroup;
  listacategorias !: Categoria[];
  listaModalidades !: Modalidad[];
  today: Date = new Date();
  oferta!: Ofertas;
  todayWithPipe!: String|null;
  pipe = new DatePipe('en-US');
  modalRef?: BsModalRef;

  constructor(private formBuilder :FormBuilder,
    private empleadorService : EmpleadorService,
    private router : Router,
    private modalService: BsModalService){

  }

  ngOnInit(): void {
    const today = new Date();

    this.todayWithPipe = this.pipe.transform(today, 'yyyy-MM-dd');
    console.log(this.todayWithPipe)

    this.empleadorService.listarCategorias().subscribe({
      next: (response: HttpResponse<Categoria[]>) => {
        var list: Categoria[]| null= null; 
          if (response.body) {
            list = response.body;
            this.listacategorias = list;
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

    this.empleadorService.listarModalidades().subscribe({
      next: (response: HttpResponse<Modalidad[]>)=> {
        var list: Modalidad[]| null= null; 
          if (response.body) {
            list = response.body;
            this.listaModalidades = list;
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

    this.form = this.formBuilder.group({
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      categoria: ["Seleccione Categoria", [Validators.required]],
      estado:  ["ACTIVA"],
      fechaPublicacion: [this.todayWithPipe],
      fechaLimite: [null, [Validators.required]],
      salario: [null, [Validators.required]],
      modalidad:["Seleccione Modalidad", [Validators.required]],
      ubicacion: [null, [Validators.required]],
      detalles: [null, [Validators.required]]
    });
  }

  enviarOferta(template: TemplateRef<any>,template2: TemplateRef<any>){
    //this.formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.todayWithPipe != this.pipe.transform(Date.now(), 'yyyy/MM/dd');
    
    if (this.form.valid) {
      
      this.oferta = this.form.value as Ofertas;
      console.log(this.oferta)
      this.empleadorService.enviarOferta(this.oferta).subscribe({
        next:(response: HttpResponse<Ofertas>)=>{
            this.modalRef = this.modalService.show(template);
            this.limpiar();
            this.router.navigate([this.empleadorService.elegirPagina('gestion')]);
          
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

  cancelarOferta(){
          this.limpiar();
          this.router.navigate([this.empleadorService.elegirPagina('gestion')]);
  }

  limpiar(): void {
    this.form.reset({});
  }

}
