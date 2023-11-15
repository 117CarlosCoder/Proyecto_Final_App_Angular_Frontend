import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CantidadTotal } from 'src/entities/CantidadTotal';
import { Fechas } from 'src/entities/Fechas';
import { FechasOferta } from 'src/entities/FechasOferta';
import { TopEmpleadores } from 'src/entities/TopEmpleadores';
import { AdminService } from 'src/services/administrador/AdminService';
import { format } from 'date-fns';
import { FechaTotal } from 'src/entities/FechaTotal';
import { Categoria } from 'src/entities/Categoria';
import { IngresoTotal } from 'src/entities/IngresoTotal';
import { FechaIngresos } from 'src/entities/FechaIngresos';
import { RegistroComision } from 'src/entities/RegistroComision';

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

  constructor(private formBuilder:FormBuilder,
    private adminService:AdminService){}

  ngOnInit(): void {
    this.carga= false;
    this.cargainforme2= false;
    
      this.formreporte2 = this.formBuilder.group({
        fechaA: [null, [Validators.required]],
        fechaB: [null, [Validators.required]]
      });
      this.formreporte3 = this.formBuilder.group({
        fechaA: [null, [Validators.required]],
        fechaB: [null, [Validators.required]],
        categoria:[1, [Validators.required]]
      });


      this.adminService.listarTopEmpleadores().subscribe({
        next: (list: TopEmpleadores[]) => {
          console.log("Cargar ofertas Costos")
          this.listaEmpleadores = list;
          console.log(this.listaEmpleadores);
        }
      });

      this.adminService.listarCategorias().subscribe({
        next: (list: Categoria[]) => {
          console.log("Cargar ofertas Costos")
          this.listarCategorias = list;
          console.log(this.listarCategorias);
        }
      });

      this.adminService.listarRegistroComision().subscribe({
        next: (list: RegistroComision[]) => {
          console.log("Cargar registro Comision")
          this.listarRegistroComision = list;
          console.log(this.listarRegistroComision);
        }
      });

  }

  cambiarFechaEstadoCantidadTotal(){
    if (this.formreporte3.valid) {
      this.fechasCantidadTotal = this.formreporte3.value as FechaTotal;
      let fechaFormateada1 = format(this.fechasCantidadTotal.fechaA, 'yyyy-MM-dd');
      let fechaFormateada2 = format(this.fechasCantidadTotal.fechaB, 'yyyy-MM-dd');
      this.adminService.listarCatidadTotal(fechaFormateada1,fechaFormateada2,this.fechasCantidadTotal.categoria).subscribe({
        next:(list: CantidadTotal)=>{
          

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
        
      });
    }
  }

  fechasIngresos(){
    if (this.formreporte2.valid) {
      this.fechaIngresosTotal = this.formreporte2.value as FechaIngresos;
      let fechaFormateada1 = format(this.fechaIngresosTotal.fechaA, 'yyyy-MM-dd');
      let fechaFormateada2 = format(this.fechaIngresosTotal.fechaB, 'yyyy-MM-dd');
      this.adminService.listarIngresoTotal(fechaFormateada1,fechaFormateada2).subscribe({
        next:(list: IngresoTotal[])=>{
          

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
        
      });
    }
  }

  descargarHistorialComision(){
    this.adminService.descargarRegistroComision().subscribe(
      response => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'HistorialComision.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    ); 
  }

  descargarTopEmpleadores(){
    this.adminService.descargarTopEmpleadores().subscribe(
      response => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'HistorialComision.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    ); 
  }

  descargarEmpleadoresIngresos(){
    if (this.formreporte2.valid) {

      this.fechaIngresosTotal = this.formreporte2.value as FechaIngresos;
      let fechaFormateada1 = format(this.fechaIngresosTotal.fechaA, 'yyyy-MM-dd');
      let fechaFormateada2 = format(this.fechaIngresosTotal.fechaB, 'yyyy-MM-dd');

      this.adminService.descargarEmpleadoresIngresos(fechaFormateada1,fechaFormateada2).subscribe(
        response => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'EmpleadoresMasIngresos.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      }
      ); 
    }
  }

  descargarTotalIngresos(){
    if (this.formreporte3.valid) {

      this.fechasCantidadTotal = this.formreporte3.value as FechaTotal;
      let fechaFormateada1 = format(this.fechasCantidadTotal.fechaA, 'yyyy-MM-dd');
      let fechaFormateada2 = format(this.fechasCantidadTotal.fechaB, 'yyyy-MM-dd');

      this.adminService.descargarTotalIngresos(fechaFormateada1,fechaFormateada2,this.fechasCantidadTotal.categoria).subscribe(
        response => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'TotalIngresos.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      }
      ); 
    }
  }


}
