import { Injectable } from '@angular/core';
import { Info } from 'src/entities/Info';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { Ofertas } from 'src/entities/Ofertas';
import { Categoria } from 'src/entities/Categoria';
import { Dashboard } from 'src/entities/Dashboar';
import { Comision } from 'src/entities/Comision';
import { TopEmpleadores } from 'src/entities/TopEmpleadores';
import { CantidadTotal } from 'src/entities/CantidadTotal';
import { IngresoTotal } from 'src/entities/IngresoTotal';
import { RegistroComision } from 'src/entities/RegistroComision';
import { CrearUsuario } from 'src/entities/CrearUsuario';
import { UsuarioT } from 'src/entities/UsuarioT';
import { NumTelefono } from 'src/entities/NumTelefono';
import { UsuarioService } from '../usuario/UsuarioService';

@Injectable({
    providedIn: 'root'
})

export class AdminService {
    readonly API_URL = "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/admin-servlet";
    readonly API_URL_REPORTS = "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/admin-report-changer-servlet";
    readonly API_URL_REPORTS_PDF = "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/admin-reports-servlet/";

    constructor(private httpClient: HttpClient,
        private usuarioService: UsuarioService) {
    }

    public listarDashboard(): Observable<Dashboard> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<Dashboard>(this.API_URL + '/listar-dashboard', {headers});
    }

    public listarUsuarios(rol:String): Observable<UsuarioT[]> {
        return this.httpClient.get<UsuarioT[]>(this.API_URL+"/listar-usuarios?rol="+rol);
    }

    public listarUsuario(codigo:number): Observable<UsuarioT> {
        return this.httpClient.get<UsuarioT>(this.API_URL+"/listar-usuario?codigo="+codigo);
    }

    public listarUsuarioEspecifico(): Observable<UsuarioT> {
        return this.httpClient.get<UsuarioT>(this.API_URL+"/listar-usuario-especifico");
    }

    public listarTelefonos(codigo:number): Observable<NumTelefono[]> {
        return this.httpClient.get<NumTelefono[]>(this.API_URL+"/listar-telefonos?codigo="+codigo);
    }

    public listarTelefonosEspecifico(): Observable<NumTelefono[]> {
        return this.httpClient.get<NumTelefono[]>(this.API_URL+"//listar-telefonos-usuario-especifico");
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

    public listarCatidadTotal(fechaA:String,fechaB:String,categoria:number, valor:boolean): Observable<CantidadTotal> {
        return this.httpClient.get<CantidadTotal>(this.API_URL_REPORTS + "/listar-cantidad-total?fechaA="+fechaA+"&fechaB="+fechaB+"&categoria="+categoria+"&valor="+valor);
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

    public crearUsuario(usuario : CrearUsuario){
        return this.httpClient.post(this.API_URL+"/crear-usuarios",usuario,{observe: 'response'});
    }

    public crearTelefonos(telefonos : NumTelefono[]){
        return this.httpClient.post(this.API_URL+"/crear-telefonos",telefonos,{observe: 'response'});
    }

    public actualizarUsuario(usuario : CrearUsuario){
        return this.httpClient.put(this.API_URL+"/actualizar-usuario",usuario,{observe: 'response'});
    }

    public actualizarTelefono( telefonos:NumTelefono[]){
        
        return this.httpClient.put(this.API_URL+"/actualizar-telefonos", telefonos);
        
    }

    public eliminarUsuario(username : String){
        return this.httpClient.delete(this.API_URL+"/eliminar-usuario?username="+username);
    }

    public eliminarCategoria(codigo : number){
        return this.httpClient.delete(this.API_URL+"/eliminar-categoria?codigo="+codigo);
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
        if (pagina == 'perfil') {
            return 'admin-editar-perfil';
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