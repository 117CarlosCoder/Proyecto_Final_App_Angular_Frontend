import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/entities/Categoria';
import { Filtros } from 'src/entities/Filtros';
import { Modalidad } from 'src/entities/Modalidad';
import { Ofertas } from 'src/entities/Ofertas';
import { Salario } from 'src/entities/Salario';
import { Ubicacion } from 'src/entities/Ubicacion';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { ActualizarNavbarService } from 'src/services/solcitante/ActualizarNavbarService';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';

@Component({
  selector: 'app-buscador-oferta',
  templateUrl: './buscador-oferta.component.html',
  styleUrls: ['./buscador-oferta.component.css']
})
export class BuscadorOfertaComponent implements OnInit {
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
    private empleadorService : EmpleadorService,
    private router : Router,
    private formBuilder : FormBuilder){
  }

  ngOnInit(): void {
    this.solicitanteService.listarCategorias().subscribe({
      next: (list: Categoria[]) => {
        this.listacategorias = list;
      }
    });

    this.solicitanteService.listarSalarios().subscribe({
      next: (list: Salario[]) => {
        this.listaSalarios = list;
      }
    });

    this.solicitanteService.listarUbicaciones().subscribe({
      next: (list: Ubicacion[]) => {
        this.listaUbicaciones = list;
      }
    });

    this.empleadorService.listarModalidades().subscribe({
      next: (list: Modalidad[])=> {
        this.listaModalidades = list;
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
    this.solicitanteService.listarOfertasNombre(this.filtros).subscribe({
      next: (list: Ofertas[]) => {
        console.log("Cargar ofertas")
        this.listaOfertas = list;
        console.log(this.listaOfertas);
      }
    });
  }
}
