import { Component, OnInit } from '@angular/core';
import { Ofertas } from 'src/entities/Ofertas';
import { ActualizarNavbarService } from 'src/services/solcitante/ActualizarNavbarService';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Categoria } from 'src/entities/Categoria';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { Modalidad } from 'src/entities/Modalidad';
import { Salario } from 'src/entities/Salario';
import { Ubicacion } from 'src/entities/Ubicacion';
import { Filtros } from 'src/entities/Filtros';

@Component({
  selector: 'app-aplicar-oferta',
  templateUrl: './aplicar-oferta.component.html',
  styleUrls: ['./aplicar-oferta.component.css']
})
export class AplicarOfertaComponent implements OnInit {
  listaOfertas !: Ofertas[];
  valorBusqueda: String = '';
  listacategorias !: Categoria[];
  listaModalidades !: Modalidad[];
  listaSalarios !: Salario[];
  listaUbicaciones !: Ubicacion[];
  form!:FormGroup;
  filtros !: Filtros;
  titulo : String = "Todas las ofertas";

    constructor(private sharedService :ActualizarNavbarService,
    private solicitanteService: SolicitanteService,
    private router : Router,
    private formBuilder : FormBuilder){
  }

  ngOnInit(): void{
    this.sharedService.updateCompletarInfo(false);

    console.log(this.valorBusqueda)

    this.solicitanteService.listarCategorias().subscribe({
      next: (list: Categoria[]) => {
        this.listacategorias = list;
      },
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        }else {
          console.error('Error en la solicitud:', error);
        }
      }
    });

    this.solicitanteService.listarSalarios().subscribe({
      next: (list: Salario[]) => {
        this.listaSalarios = list;
      },
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        }else {
          console.error('Error en la solicitud:', error);
        }
      }
    });

    this.solicitanteService.listarUbicaciones().subscribe({
      next: (list: Ubicacion[]) => {
        this.listaUbicaciones = list;
      },
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        }else {
          console.error('Error en la solicitud:', error);
        }
      }
    });

    this.solicitanteService.listarModalidades().subscribe({
      next: (list: Modalidad[])=> {
        this.listaModalidades = list;
      }
    });

    this.solicitanteService.listarOfertas().subscribe({
      next: (list: Ofertas[]) => {
        console.log("Cargar ofertas")
        this.listaOfertas = list;
        console.log(this.listaOfertas);
      },
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        }else {
          console.error('Error en la solicitud:', error);
        }
      }
    });

    /*this.solicitanteService.listarOfertasNombre(this.valorBusqueda).subscribe({
      next: (list: Ofertas[]) => {
        console.log("Cargar ofertas")
        this.listaOfertas = list;
        console.log(this.listaOfertas);
      }
    });*/

    this.form = this.formBuilder.group({
      nombre:[""],
      categoria: ["Elige categoria"],
      modalidad: ["Elige modalidad"],
      ubicacion: ["Elige ubicacion"],
      salario: ["Elige salario"]
    });

  }

  buscarEmpresa(){
    this.filtros = this.form.value as Filtros;
    if (this.filtros.categoria ==  "Elige categoria") {
      this.filtros.categoria = null;
    }
    if (this.filtros.modalidad ==  "Elige modalidad") {
      this.filtros.modalidad = null;
    } 
    if (this.filtros.ubicacion ==  "Elige ubicacion") {
      this.filtros.ubicacion = null;
    } 
    if (this.filtros.salario ==  "Elige salario") {
      this.filtros.salario = null;
    }  
    console.log(this.filtros)
    this.solicitanteService.listarOfertasNombre(this.filtros).subscribe({
      next: (list: Ofertas[]) => {
        console.log("Cargar ofertas")
        this.listaOfertas = list;
        console.log(this.listaOfertas);
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
  
  aplicarFiltros(){
    this.filtros = this.form.value as Filtros;
    if (this.filtros.categoria ==  "Elige categoria") {
      this.filtros.categoria = null;
    }
    if (this.filtros.modalidad ==  "Elige modalidad") {
      this.filtros.modalidad = null;
    } 
    if (this.filtros.ubicacion ==  "Elige ubicacion") {
      this.filtros.ubicacion = null;
    } 
    if (this.filtros.salario ==  "Elige salario") {
      this.filtros.salario = null;
    }  
    console.log(this.filtros)

    this.solicitanteService.listarOfertasFiltros(this.filtros).subscribe({
      next: (list: Ofertas[]) => {
        console.log("Cargar ofertas")
        this.listaOfertas = list;
        console.log(this.listaOfertas);
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

  todasOferta(){
    this.solicitanteService.listarOfertas().subscribe({
      next: (list: Ofertas[]) => {
        console.log("Cargar ofertas")
        this.listaOfertas = list;
        console.log(this.listaOfertas);
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

  sugerencias(){
    this.solicitanteService.listarOfertasSugerencia().subscribe({
      next: (list: Ofertas[]) => {
        console.log("Cargar ofertas")
        this.listaOfertas = list;
        console.log(this.listaOfertas);
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
    this.router.navigate(['solicitante-cargar-oferta',{codigo:codigo}]);
  }
  
}
  

