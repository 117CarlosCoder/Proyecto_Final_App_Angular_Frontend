import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioPdf } from 'src/entities/UsuarioPdf';
import { UsuarioT } from 'src/entities/UsuarioT';
import { UsuarioService } from 'src/services/usuario/UsuarioService';

@Component({
  selector: 'app-cargar-pdfs',
  templateUrl: './cargar-pdfs.component.html',
  styleUrls: ['./cargar-pdfs.component.css']
})
export class CargarPdfsComponent {

  form!:FormGroup;
  listaUsuarios!:UsuarioT[];
  listaUsuariosPdf:UsuarioPdf[] = [];

  constructor (private formBuilder : FormBuilder,
    private router:Router,
    private usuarioService: UsuarioService
 ){}

 ngOnInit() {
    this.usuarioService.listarUsuariosPDF().subscribe({
      next:(response: HttpResponse<UsuarioT[]>) =>{
          console.log(response.body)
          var list : UsuarioT[] | null = response.body;
          if (list) {
            this.listaUsuarios = list;
          var nuevoUsuarioPdf: UsuarioPdf;

          if(this.listaUsuarios != undefined){
          this.listaUsuarios.forEach(datos => {
            console.log(datos)
             nuevoUsuarioPdf = {
              codigo:0,
              codigoUsuario: datos.codigo,
              pdf:""
            };
            console.log(nuevoUsuarioPdf)
          this.listaUsuariosPdf.push(nuevoUsuarioPdf);
          });
        }
          console.log(this.listaUsuariosPdf)
            
          }
          
      }
    })

 }

 async onFileChange(event: any, usuario: UsuarioT) {
  
  const usuarioEncontrado =   this.listaUsuariosPdf.find(usuarioPdf => usuario.codigo === usuarioPdf.codigoUsuario);
  const file: File = event.target.files[0];
  const datos = await this.leerComoArrayBuffer(file);

      // Convertir el ArrayBuffer a base64
      const base64String = this.arrayBufferToBase64(datos);

      console.log(base64String);
  

  if (usuarioEncontrado) {
    usuarioEncontrado.pdf = base64String;

    console.log(this.listaUsuariosPdf)
  } 

}

leerComoArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      resolve(e.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
}

arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

cargarPdf(){
  console.log(this.listaUsuariosPdf)
 
  this.usuarioService.cargarPdfs(this.listaUsuariosPdf).subscribe({
      next:(data : any)=>{  
        console.log("Pdfs subidos");
        this.router.navigate(['empleos']);
      }
  });
}

}
