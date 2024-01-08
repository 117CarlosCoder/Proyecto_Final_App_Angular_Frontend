import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cargar-datos',
  templateUrl: './cargar-datos.component.html',
  styleUrls: ['./cargar-datos.component.css']
})
export class CargarDatosComponent {
  selectedFile: File | null = null;
  isLoading = false;

  constructor(private httpClient: HttpClient,
    private router:Router) {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
      localStorage.setItem('rol', 'Invitado');
    }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.isLoading = true;

      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);

      this.httpClient.post('http://localhost:8080/Proyecto_Final_Servlet_war/v1/carga-servlet/cargar-json', formData)
        .subscribe(response => {
          console.log('Archivo subido con éxito', response);
          this.isLoading = false;
          this.router.navigate(['cargar-pdf-usuario']);
        }, error => {
          console.error('Error al subir el archivo', error);
          this.isLoading = false;
        });
    }
  }
}