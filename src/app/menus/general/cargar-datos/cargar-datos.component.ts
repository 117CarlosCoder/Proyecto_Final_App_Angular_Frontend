import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cargar-datos',
  templateUrl: './cargar-datos.component.html',
  styleUrls: ['./cargar-datos.component.css']
})
export class CargarDatosComponent {
  selectedFile: File | null = null;
  isLoading = false;
  modalRef?: BsModalRef;
  

  constructor(private httpClient: HttpClient,
    private router:Router,
    private modalService: BsModalService) {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.setItem('rol', 'Invitado');
    }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(template: TemplateRef<any>,template2: TemplateRef<any>): void {
    if (this.selectedFile) {
      this.isLoading = true;

      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);

      this.httpClient.post('http://localhost:8080/Proyecto_Final_Servlet_war/v1/carga-servlet/cargar-json', formData)
        .subscribe({
        next:(response : any) => {
          console.log('Archivo subido con éxito', response);
          this.isLoading = false;
          this.router.navigate(['cargar-pdf-usuario']);
        }, error:(error) => {
          if (error.status === 406) {
            console.error('Error al subir el archivo', error);
            this.modalRef = this.modalService.show(template);
            this.router.navigate(['empleos']);
          }
          if (error.status === 409) {
            this.modalRef = this.modalService.show(template2);
            this.router.navigate(['empleos']);
          }
          if (error.status === 200) {
            console.error('Error al subir el archivo', error);
            this.modalRef = this.modalService.show(template);
          }
          
          this.isLoading = false;
        }
      });
    }
  }
}