import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/entities/Categoria';
import { Filtros } from 'src/entities/Filtros';
import { Modalidad } from 'src/entities/Modalidad';
import { Ofertas } from 'src/entities/Ofertas';
import { Salario } from 'src/entities/Salario';
import { Ubicacion } from 'src/entities/Ubicacion';
import { InvitadoService } from 'src/services/invitado/InvitadoService';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';

@Component({
  selector: 'app-empleos',
  templateUrl: './empleos.component.html',
  styleUrls: ['./empleos.component.css']
})
export class EmpleosComponent {

  listaOfertas !: Ofertas[];
  valorBusqueda: String = '';
  listacategorias !: Categoria[];
  listaModalidades !: Modalidad[];
  listaSalarios !: Salario[];
  listaUbicaciones !: Ubicacion[];
  form!:FormGroup;
  filtros !: Filtros;
  titulo : String = "Todas las ofertas";
  cargaOfertasA:boolean = false;

    constructor(
    private invitadoService: InvitadoService,
    private router : Router,
    private formBuilder : FormBuilder){
  }

  ngOnInit() {

    this.invitadoService.listarCategorias().subscribe({
      next: (list:HttpResponse<Categoria[]>) => {
        var lista: Categoria[]| null = null
        if (list.body) {
          lista = list.body;
          this.listacategorias = lista;
        }
      },
      error: (error) => {
        
          console.error('Error en la solicitud:', error);
        
      }
    });

    this.invitadoService.listarSalarios().subscribe({
      next: (list: Salario[]) => {
        this.listaSalarios = list;
      },
      error: (error) => {
        
          console.error('Error en la solicitud:', error);
        
      }
    });

    this.invitadoService.listarUbicaciones().subscribe({
      next: (list: Ubicacion[]) => {
        this.listaUbicaciones = list;
      },
      error: (error) => {
        
          console.error('Error en la solicitud:', error);
        
      }
    });

    this.invitadoService.listarModalidades().subscribe({
      next: (list: Modalidad[])=> {
        this.listaModalidades = list;
      }
    });

    this.invitadoService.listarOfertas().subscribe({
      next: (list: Ofertas[]) => {
        console.log("Cargar ofertas")
        this.listaOfertas = list;
        console.log(this.listaOfertas);
        this.cargaOfertasA=true;
      },
      error: (error) => {
        
          console.error('Error en la solicitud:', error);
        
      }
    });

    this.invitadoService.vista().subscribe({
      next: (data: any) => {
        console.log("Visita")
      },
      error: (error) => {
        
          console.error('Error en la solicitud:', error);
        
      }
    });

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
    this.invitadoService.listarOfertasNombre(this.filtros).subscribe({
      next: (list: Ofertas[]) => {
        console.log("Cargar ofertas")
        this.listaOfertas = list;
        console.log(this.listaOfertas);
        
      },
      error: (error) => {
        
          console.error('Error en la solicitud:', error);
        
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

    this.invitadoService.listarOfertasFiltros(this.filtros).subscribe({
      next: (list: Ofertas[]) => {
        console.log("Cargar ofertas")
        this.listaOfertas = list;
        console.log(this.listaOfertas);
      },
      error: (error) => {
        
          console.error('Error en la solicitud:', error);
        
      }
    });
  }

  masInformacion(codigo:number){
    this.router.navigate(['empleos-mas-info',{codigo:codigo}]);
  }

  reiciar(){
    location.reload();
  }


}
