import { Injectable } from '@angular/core';
import { Info } from 'src/entities/Info';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ofertas } from 'src/entities/Ofertas';
import { Categoria } from 'src/entities/Categoria';
import { Dashboard } from 'src/entities/Dashboar';
import { Comision } from 'src/entities/Comision';
import { TopEmpleadores } from 'src/entities/TopEmpleadores';
import { CantidadTotal } from 'src/entities/CantidadTotal';
import { IngresoTotal } from 'src/entities/IngresoTotal';
import { RegistroComision } from 'src/entities/RegistroComision';

@Injectable({
    providedIn: 'root'
})

export class AdminService {
    readonly API_URL = "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/admin-servlet";
    readonly API_URL_REPORTS = "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/admin-report-changer-servlet";
    readonly API_URL_REPORTS_PDF = "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/admin-reports-servlet/";

    constructor(private httpClient: HttpClient) {
    }

    public listarDashboard(options?: { headers?: HttpHeaders , withCredentials?: true} ): Observable<Dashboard> {
        return this.httpClient.get<Dashboard>(this.API_URL+"/listar-dashboard", options);
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

    public listarTopEmpleadores(): Observable<TopEmpleadores[]> {
        return this.httpClient.get<TopEmpleadores[]>(this.API_URL_REPORTS + "/listar-top-empleadores");
    }

    public listarCatidadTotal(fechaA:String,fechaB:String,categoria:number): Observable<CantidadTotal> {
        return this.httpClient.get<CantidadTotal>(this.API_URL_REPORTS + "/listar-cantidad-total?fechaA="+fechaA+"&fechaB="+fechaB+"&categoria="+categoria);
    }

    public listarIngresoTotal(fechaA:String,fechaB:String): Observable<IngresoTotal[]> {
        return this.httpClient.get<IngresoTotal[]>(this.API_URL_REPORTS + "/ingresos-fecha?fechaA="+fechaA+"&fechaB="+fechaB);
    }

    public listarRegistroComision(): Observable<RegistroComision[]> {
        return this.httpClient.get<RegistroComision[]>(this.API_URL_REPORTS + "/listar-registro-comision");
    }

    public editarCategoria(categoria : Categoria): Observable<Categoria> {
        return this.httpClient.put<Categoria>(this.API_URL+"/gestionar-categorias-actualizar",categoria);
    }

    public cambiarComision(comision : Comision): Observable<Comision> {
        return this.httpClient.put<Comision>(this.API_URL+"/actualizar-comision",comision);
    }

    public registrarComision(comision : RegistroComision): Observable<RegistroComision> {
        return this.httpClient.post<RegistroComision>(this.API_URL+"/crear-registro-comision",comision);
    }

    public crearCategoria(categoria : Categoria): Observable<Categoria> {
        return this.httpClient.post<Categoria>(this.API_URL+"/gestionar-categorias-crear",categoria);
    }

    public descargarRegistroComision() {
        return this.httpClient.get(this.API_URL_REPORTS_PDF + "/historial-comision", { responseType: 'blob' });
    }

    public descargarTopEmpleadores() {
        return this.httpClient.get(this.API_URL_REPORTS_PDF + "/empleadores-mas-ofertas", { responseType: 'blob' });
    }

    public descargarEmpleadoresIngresos(fechaA:String,fechaB : String) {
        return this.httpClient.get(this.API_URL_REPORTS_PDF + "/empleadores-mas-ingresos?fechaA="+fechaA+"&fechaB="+fechaB, { responseType: 'blob' });
    }

    public descargarTotalIngresos(fechaA:String,fechaB : String,categoria:number) {
        return this.httpClient.get(this.API_URL_REPORTS_PDF + "/total-ingresos?fechaA="+fechaA+"&fechaB="+fechaB+"&categoria="+categoria, { responseType: 'blob' });
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