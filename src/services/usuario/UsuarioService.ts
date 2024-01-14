import { Injectable } from "@angular/core";
import { Usuario } from "../../entities/Usuario";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http"
import { Observable, of } from "rxjs";
import { Categoria } from "src/entities/Categoria";
import { CrearUsuario } from "src/entities/CrearUsuario";
import { Telefono } from "src/entities/Telefono";
import { NumTelefono } from "src/entities/NumTelefono";
import { UsuarioT } from "src/entities/UsuarioT";
import { UsuarioPdf } from "src/entities/UsuarioPdf";
import { Notificaciones } from "src/entities/Notificaciones";


@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    readonly API_URL = "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1";

    constructor(private httpClient: HttpClient) {}

    public inciarSesion(usuario: Usuario){
        console.log('connectando con el BE: ' + usuario);
        this.setCredenciales(usuario.username,usuario.password);
        return this.httpClient.post<Usuario>(this.API_URL+"/sesion-servlet/", usuario, {observe: 'response'} );
    }

    setCredenciales(username: string, password: string): void {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
    }

    getCredenciales(){
        var username = localStorage.getItem('username');
        var password = localStorage.getItem('password');

        console.log('usuario : '+username)
    
        var headers = {
                'Authorization': 'Basic ' + btoa(username + ':' + password)
        };

        console.log(headers);

        return headers;
    }
    
    removeCredenciales(): void {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.clear()
    }

    getCredentialUsername(){
        return localStorage.getItem('username');
    }

    setRol(rol:string){
        return localStorage.setItem('rol', rol);
    }



    public crearUsuarioSolicitante(usuario: CrearUsuario){
        const headers = new HttpHeaders(this.getCredenciales());
        return this.httpClient.post("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/user-servlet/crear-usuario-solicitante", usuario, {observe: 'response', headers});
        
    }
    

    public listarNotificaciones(): Observable<Notificaciones[]>{
        const headers = new HttpHeaders(this.getCredenciales());
        return this.httpClient.get<Notificaciones[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/user-servlet/listar-notificaciones", { headers});
        
    }
    
    public crearUsuarioTelefonos( telefonos:Telefono, username: String){
        const headers = new HttpHeaders(this.getCredenciales());
        return this.httpClient.post("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/user-servlet/crear-telefonos?username="+username, telefonos, {observe: 'response', headers});
        
    }

    public actualizarTelefono( telefonos:NumTelefono[]){
        const headers = new HttpHeaders(this.getCredenciales());
        return this.httpClient.put("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/user-servlet/actualizar-telefonos", telefonos, {observe: 'response',headers});
        
    }

    public restablecerContraseña(email:String){
        const headers = new HttpHeaders(this.getCredenciales());
        return this.httpClient.post("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/user-servlet/restablecer-contrasena?email="+email,{body:'', headers});
        
    }

    public crearUsuarioEmpleador(usuario: CrearUsuario, ){
        const headers = new HttpHeaders(this.getCredenciales());
        return this.httpClient.post("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/user-servlet/crear-usuario-empleador", usuario, {observe: 'response', headers});
        
    }

    public cargarPdfs(usuario: UsuarioPdf[], ){
        console.log("1 enviado : "  + usuario[0].pdf);
        console.log("2 enviado : "  + usuario[1].pdf);
        console.log("3 enviado : "  + usuario[2].pdf);
        const headers = new HttpHeaders(this.getCredenciales());
        return this.httpClient.post("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/carga-servlet/cargar-pdfs", usuario, {observe: 'response', headers});
        
    }


    public listarCategorias(): Observable<HttpResponse<Categoria[]>> {
        const headers = new HttpHeaders(this.getCredenciales());
        return this.httpClient.get<Categoria[]>(this.API_URL + "/applicant-servlet/listar-ofertas", {observe: 'response', headers});
    }

    public listarUsuariosPDF(): Observable<HttpResponse<UsuarioT[]>> {
        const headers = new HttpHeaders(this.getCredenciales());
        return this.httpClient.get<UsuarioT[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/carga-servlet", {observe: 'response', headers});
    }

    public comprobarUsuario(rol:String){
        if (rol == "Administrador") {
            return 'admin-dashboard';
        }
        if (rol == "Empleador") {
            return '/empleador-completar-informacion';
        }
        if (rol == "Solicitante") {
           return '/solicitante-completar-informacion';
        }
        return '';
    }

    public paginaInicial(rol:String){
        if (rol == "Administrador") {
            return 'admin-dashboard';
        }
        if (rol == "Solicitante") {
           return '/solicitante-aplicar-oferta';
        }
        if (rol == "Empleador") {
            return '/empleador-gestion';
        }
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        return '/login';
    }

    public cerrarSesion(){
        return this.httpClient.get(this.API_URL+"/sesion-servlet/cerrar-sesion");
    }

}