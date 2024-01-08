import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CantidadTotal } from 'src/entities/CantidadTotal';
import { TopEmpleadores } from 'src/entities/TopEmpleadores';
import { AdminService } from 'src/services/administrador/AdminService';
import { format } from 'date-fns';
import { FechaTotal } from 'src/entities/FechaTotal';
import { Categoria } from 'src/entities/Categoria';
import { IngresoTotal } from 'src/entities/IngresoTotal';
import { FechaIngresos } from 'src/entities/FechaIngresos';
import { RegistroComision } from 'src/entities/RegistroComision';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-reportes',
  templateUrl: './admin-reportes.component.html',
  styleUrls: ['./admin-reportes.component.css']
})
export class AdminReportesComponent implements OnInit{
  formreporte1!:FormGroup;
  formreporte2!:FormGroup;
  formreporte3!:FormGroup;
  listaEmpleadores!:TopEmpleadores[];
  listarIngresosTotales!:IngresoTotal[]
  listarRegistroComision!:RegistroComision[];
  gananciaTotal!: CantidadTotal;
  fechasCantidadTotal!:FechaTotal;
  fechaIngresosTotal!:FechaIngresos;
  listarCategorias!:Categoria[];
  carga!:boolean;
  cargainforme2!:boolean;
  valor:boolean=false;

  constructor(private formBuilder:FormBuilder,
    private adminService:AdminService,
    private router:Router){}

  ngOnInit(): void {
    this.carga= false;
    this.cargainforme2= false;
    
      this.formreporte2 = this.formBuilder.group({
        fechaA: [null, [Validators.required]],
        fechaB: [null, [Validators.required]]
      });
      this.formreporte3 = this.formBuilder.group({
        fechaA: [null],
        fechaB: [null],
        categoria:[1]
      });


      this.adminService.listarTopEmpleadores().subscribe({
        next: (response: HttpResponse<TopEmpleadores[]>) => {
          console.log("Cargar ofertas Costos");
          var list:TopEmpleadores[] | null= null; 
            if (response.body) {
              list = response.body;
              this.listaEmpleadores = list;
              console.log(this.listaEmpleadores);
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

      this.adminService.listarCategorias().subscribe({
        next: (response: HttpResponse<Categoria[]>) => {
          console.log("Cargar ofertas Costos")
          var list:Categoria[] | null= null; 
            if (response.body) {
              list = response.body;
              this.listarCategorias = list;
              console.log(this.listarCategorias);
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

      this.adminService.listarRegistroComision().subscribe({
        next: (response: HttpResponse<RegistroComision[]>) => {
          console.log("Cargar registro Comision")
          var list:RegistroComision[] | null= null; 
            if (response.body) {
              list = response.body;
              this.listarRegistroComision = list;
              console.log(this.listarRegistroComision);
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

      this.adminService.listarCatidadTotal("","",0,this.valor).subscribe({
        next:(response: HttpResponse<CantidadTotal>)=>{
          var list:CantidadTotal | null= null; 
            if (response.body) {
              list = response.body;
              if(list){
                console.log("Cargar ganancia total")
                this.gananciaTotal = list;
                console.log(this.gananciaTotal);
                this.carga=true;
              }
              else{
                this.formreporte3.reset({
                  
                });
                this.formreporte3 = this.formBuilder.group({
                  fechaA: [null, [Validators.required]],
                  fechaB: [null, [Validators.required]],
                  categoria: [null, [Validators.required]]
                });
              }
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

  cambioCategoria(categoria: number){
    this.fechasCantidadTotal.categoria = categoria;
  }

  cambiarFechaEstadoCantidadTotal( ){
    if (this.formreporte3.valid) {
      this.valor = true;
      this.fechasCantidadTotal = this.formreporte3.value as FechaTotal;
      let fechaFormateada1 = format(this.fechasCantidadTotal.fechaA, 'yyyy-MM-dd');
      let fechaFormateada2 = format(this.fechasCantidadTotal.fechaB, 'yyyy-MM-dd');
      console.log(this.fechasCantidadTotal)
      this.adminService.listarCatidadTotal(fechaFormateada1,fechaFormateada2,this.fechasCantidadTotal.categoria, this.valor).subscribe({
        next:(response: HttpResponse<CantidadTotal>)=>{
          var list:CantidadTotal | null= null; 
            if (response.body) {
              list = response.body;
              if(list){
                console.log("Cargar ganancia total")
                this.gananciaTotal = list;
                console.log(this.gananciaTotal);
                this.carga=true;
              }
              else{
                this.formreporte3.reset({
                  
                });
                this.formreporte3 = this.formBuilder.group({
                  fechaA: [null, [Validators.required]],
                  fechaB: [null, [Validators.required]],
                  categoria: [null, [Validators.required]]
                });
              }
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
  }

  fechasIngresos(){
    if (this.formreporte2.valid) {
      this.fechaIngresosTotal = this.formreporte2.value as FechaIngresos;
      let fechaFormateada1 = format(this.fechaIngresosTotal.fechaA, 'yyyy-MM-dd');
      let fechaFormateada2 = format(this.fechaIngresosTotal.fechaB, 'yyyy-MM-dd');
      this.adminService.listarIngresoTotal(fechaFormateada1,fechaFormateada2).subscribe({
        next:(response: HttpResponse<IngresoTotal[]>)=>{
          var list:IngresoTotal[] | null= null; 
            if (response.body) {
              list = response.body;
              if(list){
                console.log("Cargar ingresos totales empleadores")
                this.listarIngresosTotales = list;
                console.log(this.listarIngresosTotales);
                this.cargainforme2=true;
              }
              else{
                this.formreporte2.reset({
                  
                });
                this.formreporte2 = this.formBuilder.group({
                  fechaA: [null, [Validators.required]],
                  fechaB: [null, [Validators.required]]
                });
              }
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
  }

  descargarHistorialComision(){
    this.adminService.descargarRegistroComision().subscribe({
      next:(response: HttpResponse<any>)=> {
        const url = window.URL.createObjectURL(response.body);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'HistorialComision.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
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

  descargarTopEmpleadores(){
    this.adminService.descargarTopEmpleadores().subscribe({
      next:(response: HttpResponse<any>) => {
        const url = window.URL.createObjectURL(response.body);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'HistorialComision.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },
    error: (error) => {
      if(error.status === 406){
        this.router.navigate(['**']);
      }else {
        console.error('Error en la solicitud:', error);
      }
    }
    }
    ); 
  }

  descargarEmpleadoresIngresos(){
    if (this.formreporte2.valid) {

      this.fechaIngresosTotal = this.formreporte2.value as FechaIngresos;
      let fechaFormateada1 = format(this.fechaIngresosTotal.fechaA, 'yyyy-MM-dd');
      let fechaFormateada2 = format(this.fechaIngresosTotal.fechaB, 'yyyy-MM-dd');

      this.adminService.descargarEmpleadoresIngresos(fechaFormateada1,fechaFormateada2).subscribe({
        next:(response: HttpResponse<any>) => {
          const url = window.URL.createObjectURL(response.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'EmpleadoresMasIngresos.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
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
  }

  descargarTotalIngresos(){
    if (this.formreporte3.valid) {

      let fechaFormateada1 = '';
      let fechaFormateada2 = '';

      this.fechasCantidadTotal = this.formreporte3.value as FechaTotal;
      if (this.fechasCantidadTotal.fechaA != undefined ) {
        fechaFormateada1 = format(this.fechasCantidadTotal.fechaA, 'yyyy-MM-dd');
        fechaFormateada2 = format(this.fechasCantidadTotal.fechaB, 'yyyy-MM-dd');
      }
      

      console.log(this.fechasCantidadTotal)
      this.adminService.descargarTotalIngresos(fechaFormateada1,fechaFormateada2,this.fechasCantidadTotal.categoria).subscribe({
        next:(response: HttpResponse<any>) => {
          const url = window.URL.createObjectURL(response.body);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'TotalIngresos.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      },
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        }else {
          console.error('Error en la solicitud:', error);
        }
      }
    }
      ); 
    }
  }


}
