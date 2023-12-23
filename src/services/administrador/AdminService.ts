import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
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
import { Telefono } from 'src/entities/Telefono';
import { TelefonoUsuario } from 'src/entities/TelefonoUsuario';

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

    public listarDashboard(): Observable<HttpResponse<Dashboard>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<Dashboard>(this.API_URL + '/listar-dashboard', {observe: 'response', headers});
    }

    public listarUsuarios(rol:String): Observable<HttpResponse<UsuarioT[]>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<UsuarioT[]>(this.API_URL+"/listar-usuarios?rol="+rol, { observe : 'response',headers});
    }

    public listarUsuario(codigo:number): Observable<HttpResponse<UsuarioT>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<UsuarioT>(this.API_URL+"/listar-usuario?codigo="+codigo, {observe :  'response', headers});
    }

    public listarUsuarioEspecifico(): Observable<HttpResponse<UsuarioT>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<UsuarioT>(this.API_URL+"/listar-usuario-especifico", {observe: 'response', headers});
    }

    public listarTelefonos(codigo:number): Observable<HttpResponse<NumTelefono[]>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<NumTelefono[]>(this.API_URL+"/listar-telefonos?codigo="+codigo, { observe : 'response',headers});
    }

    public listarTelefonosEspecifico(): Observable<HttpResponse<NumTelefono[]>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<NumTelefono[]>(this.API_URL+"//listar-telefonos-usuario-especifico", {observe : 'response', headers});
    }

    public enviarOferta(oferta: Ofertas): Observable<HttpResponse<Ofertas>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.post<Ofertas>(this.API_URL+"/crear-oferta", oferta, {observe : 'response', headers});
    }

    public eliminarOferta(codigo: number){
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.delete<Ofertas>(this.API_URL+"/eliminar-oferta?codigo="+codigo, {observe : 'response', headers});
    }

    public actualizarOferta(oferta: Ofertas): Observable<HttpResponse<Ofertas>> {
        console.log(oferta)
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.put<Ofertas>(this.API_URL+"/actualizar-oferta", oferta, {observe : 'response',headers});
    }

    public listarCategorias(): Observable<HttpResponse<Categoria[]>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<Categoria[]>(this.API_URL + "/cargar-categorias", {observe : 'response',headers});
    }

    public listarCategoria(codigo:number): Observable<HttpResponse<Categoria>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<Categoria>(this.API_URL + "/cargar-categoria?codigo="+codigo, {observe : 'response',headers});
    }

    public listarComision(): Observable<HttpResponse<Comision>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<Comision>(this.API_URL + "/listar-comision", {observe : 'response',headers});
    }

    public listarTopEmpleadores(): Observable<HttpResponse<TopEmpleadores[]>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<TopEmpleadores[]>(this.API_URL_REPORTS + "/listar-top-empleadores", {observe : 'response',headers});
    }

    public listarCatidadTotal(fechaA:String,fechaB:String,categoria:number, valor:boolean): Observable<HttpResponse<CantidadTotal>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<CantidadTotal>(this.API_URL_REPORTS + "/listar-cantidad-total?fechaA="+fechaA+"&fechaB="+fechaB+"&categoria="+categoria+"&valor="+valor, {observe : 'response',headers});
    }

    public listarIngresoTotal(fechaA:String,fechaB:String): Observable<HttpResponse<IngresoTotal[]>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<IngresoTotal[]>(this.API_URL_REPORTS + "/ingresos-fecha?fechaA="+fechaA+"&fechaB="+fechaB, {observe : 'response',headers});
    }

    public listarRegistroComision(): Observable<HttpResponse<RegistroComision[]>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<RegistroComision[]>(this.API_URL_REPORTS + "/listar-registro-comision", {observe : 'response',headers});
    }

    public editarCategoria(categoria : Categoria): Observable<HttpResponse<Categoria>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.put<Categoria>(this.API_URL+"/gestionar-categorias-actualizar",categoria, {observe : 'response',headers});
    }

    public cambiarComision(comision : Comision): Observable<HttpResponse<Comision>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.put<Comision>(this.API_URL+"/actualizar-comision",comision, {observe: 'response', headers});
    }

    public registrarComision(comision : RegistroComision): Observable<HttpResponse<RegistroComision>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.post<RegistroComision>(this.API_URL+"/crear-registro-comision",comision, {observe : 'response',headers});
    }

    public crearCategoria(categoria : Categoria): Observable<HttpResponse<Categoria>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.post<Categoria>(this.API_URL+"/gestionar-categorias-crear",categoria, {observe : 'response',headers});
    }

    public crearUsuario(usuario : CrearUsuario, telefonos : Telefono){
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        const data = {
            usuario: usuario,
            telefonos: telefonos
        };
        return this.httpClient.post(this.API_URL+"/crear-usuarios",data,{observe: 'response', headers});
    }


    public crearTelefonos(telefonos : NumTelefono[]){
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.post(this.API_URL+"/crear-telefonos",telefonos,{observe: 'response', headers});
    }

    public crearTelefonosUsuario(telefonos : TelefonoUsuario[]){
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.post(this.API_URL+"/crear-telefonos-usuario",telefonos,{observe: 'response', headers});
    }

    public actualizarUsuario(usuario : CrearUsuario){
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.put(this.API_URL+"/actualizar-usuario",usuario,{observe: 'response', headers});
    }

    public actualizarTelefono( telefonos:NumTelefono[]){
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.put(this.API_URL+"/actualizar-telefonos", telefonos, {observe : 'response',headers});
        
    }

    public eliminarUsuario(username : String){
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.delete(this.API_URL+"/eliminar-usuario?username="+username, {observe : 'response',headers});
    }

    public eliminarCategoria(codigo : number){
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.delete(this.API_URL+"/eliminar-categoria?codigo="+codigo, {observe : 'response',headers});
    }

    public descargarRegistroComision() {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get(this.API_URL_REPORTS_PDF + "/historial-comision", { responseType: 'blob' ,observe : 'response', headers});
    }

    public descargarTopEmpleadores() {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get(this.API_URL_REPORTS_PDF + "/empleadores-mas-ofertas", { responseType: 'blob',observe : 'response', headers });
    }

    public descargarEmpleadoresIngresos(fechaA:String,fechaB : String) {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get(this.API_URL_REPORTS_PDF + "/empleadores-mas-ingresos?fechaA="+fechaA+"&fechaB="+fechaB, { responseType: 'blob',observe : 'response', headers });
    }

    public descargarTotalIngresos(fechaA:String,fechaB : String,categoria:number) {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get(this.API_URL_REPORTS_PDF + "/total-ingresos?fechaA="+fechaA+"&fechaB="+fechaB+"&categoria="+categoria, { responseType: 'blob',observe : 'response', headers });
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