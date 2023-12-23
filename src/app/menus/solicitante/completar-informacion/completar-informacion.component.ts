import { Component } from '@angular/core';
import { Categoria } from 'src/entities/Categoria';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
import { FormGroup, FormBuilder, Validators, FormControl,FormArray } from '@angular/forms';
import { Informacion } from 'src/entities/Informacion';
import { Router } from '@angular/router';
import { NavbarSolicitanteComponent } from 'src/app/navbars/navbar-solicitante/navbar-solicitante.component';
import { ActualizarNavbarService } from 'src/services/solcitante/ActualizarNavbarService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-completar-informacion',
  templateUrl: './completar-informacion.component.html',
  styleUrls: ['./completar-informacion.component.css']
})
export class CompletarInformacionComponent{
  listacategorias: Categoria[] = [];
  informacionCompleta!: Informacion;
  form!:FormGroup
  

  

  constructor(private solicitanteService: SolicitanteService, private formBuilder: FormBuilder, private router : Router, private navbar: NavbarSolicitanteComponent, 
    private sharedService : ActualizarNavbarService,
    private http: HttpClient) {
    this.form = this.formBuilder.group({
      curriculum: [null, Validators.required],
      categorias: this.formBuilder.array([], [Validators.required])
    });
  }

  

  ngOnInit(): void {
    this.sharedService.updateCompletarInfo(true);
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

  }

  get categorias(){
    return this.form.get('categorias') as FormArray;
  }

  categoriaSeleccionada(e:Event, codigo : string) {
    const categorias: FormArray = this.form.get('categorias') as FormArray;
  
    if ((e.target as HTMLInputElement).checked) {
      categorias.push(new FormControl(codigo));
    } else {
       const index = categorias.controls.findIndex(x => x.value === codigo);
       categorias.removeAt(index);
    }
  }

  async subirArchivo(event: any) {
    if (event.target.files && event.target.files.length > 0) {
    
    const file: File = event.target.files[0];
    console.log(file)
    console.log(file.type)
    const nombreArchivo = file.name;
    const datos = await file.arrayBuffer();

    const blob = new Blob([datos], { type: file.type });

  
    console.log('post')

    this.http.post('http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-curriculum/', blob).subscribe({
      next: (data:any) => {
        console.log("se envio")
      },
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        }else {
          console.error('Error en la solicitud:', error);
        }
      }
    });

    console.log(blob)
  }
  }

  
  submit(): void {
    this.informacionCompleta = this.form.value as Informacion;
      this.solicitanteService.completarInformacion(this.informacionCompleta).subscribe({
        next: (data:any) => {
          this.sharedService.updateCompletarInfo(false);
          this.router.navigate([this.solicitanteService.elegirPagina("aplicar")]);
        },
        error: (error: any) => {
          console.log("error" + error);
        }
      });
    console.log(this.informacionCompleta);
  }
}
