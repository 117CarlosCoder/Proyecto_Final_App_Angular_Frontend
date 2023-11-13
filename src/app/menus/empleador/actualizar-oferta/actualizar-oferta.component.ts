import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Categoria } from 'src/entities/Categoria';
import { Modalidad } from 'src/entities/Modalidad';
import { Ofertas } from 'src/entities/Ofertas';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-actualizar-oferta',
  templateUrl: './actualizar-oferta.component.html',
  styleUrls: ['./actualizar-oferta.component.css']
})
export class ActualizarOfertaComponent {
  form!:FormGroup;
  listaOferta !: Ofertas;
  listacategorias !: Categoria[];
  listaModalidades !: Modalidad[];
  today: Date = new Date();
  oferta!: Ofertas;
  todayWithPipe!: String|null;
  pipe = new DatePipe('en-US');
  modalRef?: BsModalRef;
  codigo!:number;

  constructor(private formBuilder :FormBuilder,
    private empleadorService : EmpleadorService,
    private router : Router,
    private modalService: BsModalService,
    private route : ActivatedRoute){

  }

  ngOnInit(): void {

    const today = new Date();

    console.log(new Date(this.today))

    this.route.params.subscribe(params => {
      const valorRecibido = params['codigo'];
      this.codigo = valorRecibido;
      console.log(this.codigo)
    });


    /*this.form = this.formBuilder.group({
      codigo: [this.codigo, [Validators.required]],
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      fechaLimite: [null, [Validators.required]],
      salario: [null, [Validators.required]],
      modalidad:[null, [Validators.required]],
      ubicacion: [null, [Validators.required]],
      detalles: [null, [Validators.required]]
    });*/

    this.empleadorService.listarOferta(this.codigo).subscribe({
      next: (list: Ofertas) => {
        this.listaOferta = list;
        console.log(list);
        this.today =new Date(this.listaOferta.fechaLimite);
        console.log(this.listaOferta.modalidad)
        this.ofertaCarga();
        
        
      }
    });

    this.empleadorService.listarCategorias().subscribe({
      next: (list: Categoria[]) => {
        this.listacategorias = list;
      }
    });

    this.empleadorService.listarModalidades().subscribe({
      next: (list: Modalidad[])=> {
        this.listaModalidades = list;
      }
    });


    this.form = this.formBuilder.group({
      codigo: [this.codigo, [Validators.required]],
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      fechaLimite: [null, [Validators.required]],
      salario: [null, [Validators.required]],
      modalidad:[null, [Validators.required]],
      ubicacion: [null, [Validators.required]],
      detalles: [null, [Validators.required]]
    });
    
    
  }

  ofertaCarga(){
  
    this.form = this.formBuilder.group({
      codigo: [this.codigo, [Validators.required]],
      nombre: [this.listaOferta.nombre, [Validators.required]],
      descripcion: [this.listaOferta.descripcion, [Validators.required]],
      categoria: [this.listaOferta.categoria, [Validators.required]],
      fechaLimite: [this.today, [Validators.required]],
      salario: [this.listaOferta.salario, [Validators.required]],
      modalidad:[this.listaOferta.modalidad, [Validators.required]],
      ubicacion: [this.listaOferta.ubicacion, [Validators.required]],
      detalles: [this.listaOferta.detalles, [Validators.required]]
    });

  }

  actualizarOferta(template: TemplateRef<any>){
    //this.formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.todayWithPipe != this.pipe.transform(Date.now(), 'yyyy/MM/dd');
    console.log("Oferta" + this.oferta);
    console.log(this.form.value)
    if (this.form.valid) {
      this.modalRef = this.modalService.show(template);
      this.oferta = this.form.value as Ofertas;
      console.log("Oferta" + this.oferta.nombre);
      console.log(this.oferta)
      this.empleadorService.actualizarOferta(this.oferta).subscribe({
        next:(data:any)=>{
          this.limpiar();
          this.router.navigate([this.empleadorService.elegirPagina('gestion')]);
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
