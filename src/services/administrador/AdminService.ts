import { Injectable } from '@angular/core';
import { Info } from 'src/entities/Info';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ofertas } from 'src/entities/Ofertas';
import { Categoria } from 'src/entities/Categoria';
import { Modalidad } from 'src/entities/Modalidad';
import { Codigo } from 'src/entities/Codigo';
import { Postulacion } from 'src/entities/Postulacion';
import { Postulante } from 'src/entities/Postulante';
import { DatosPostulante } from 'src/entities/DatosPostulante';
import { DatosEntrevista } from 'src/entities/DatosEntrevista';
import { Entrevista } from 'src/entities/Entrevista';
import { EntrevistaInfo } from 'src/entities/EntrevistaInfo';
import { EntrevistaFinal } from 'src/entities/EntrevistaFinal';
import { Dashboard } from 'src/entities/Dashboar';
import { Comision } from 'src/entities/Comision';

@Injectable({
    providedIn: 'root'
})

export class AdminService {
    readonly API_URL = "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/admin-servlet";

    constructor(private httpClient: HttpClient) {
    }

    public listarDashboard(): Observable<Dashboard> {
        return this.httpClient.get<Dashboard>(this.API_URL+"/listar-dashboard");
    }

    public enviarOferta(oferta: Ofertas): Observable<Ofertas> {
        return this.httpClient.post<Ofertas>(this.API_URL+"/crear-oferta", oferta);
    }

    public eliminarOferta(codigo: number){
        return this.httpClient.delete<Ofertas>(this.API_URL+"/eliminar-oferta?codigo="+codigo);
    }

    public actualizarOferta(oferta: Ofertas): Observable<Ofertas> {
        console.log(oferta)
        return this.httpClient.put<Ofertas>(this.API_URL+"/actualizar-oferta", oferta);
    }

    public listarCategorias(): Observable<Categoria[]> {
        return this.httpClient.get<Categoria[]>(this.API_URL + "/cargar-categorias");
    }

    public listarCategoria(codigo:number): Observable<Categoria> {
        return this.httpClient.get<Categoria>(this.API_URL + "/cargar-categoria?codigo="+codigo);
    }

    public listarComision(): Observable<Comision> {
        return this.httpClient.get<Comision>(this.API_URL + "/listar-comision");
    }

    public editarCategoria(categoria : Categoria): Observable<Categoria> {
        return this.httpClient.put<Categoria>(this.API_URL+"/gestionar-categorias-actualizar",categoria);
    }

    public cambiarComision(comision : Comision): Observable<Comision> {
        return this.httpClient.put<Comision>(this.API_URL+"/actualizar-comision",comision);
    }

    public crearCategoria(categoria : Categoria): Observable<Categoria> {
        return this.httpClient.post<Categoria>(this.API_URL+"/gestionar-categorias-crear",categoria);
    }


    public elegirPagina(pagina:String){
    
        if (pagina == 'dashboard') {
            return 'admin-dashboard';
        }
        if (pagina == 'gestion') {
            return 'admin-gestion';
        }
        if (pagina == 'comision') {
           return 'cambiar-comision';
        }
        if (pagina == 'reportes') {
            return 'admin-reportes';
        }
        return 'admin-dashboard';
    }
    
    public nombrePagina(pagina:String){
        if (pagina == "gestion") {
            return 'Gestion';
        }
        if (pagina == "comision") {
           return 'Comision';
        }
        if (pagina == "reportes") {
            return 'Revision Entrevista';
        }
        return '';
    }

}