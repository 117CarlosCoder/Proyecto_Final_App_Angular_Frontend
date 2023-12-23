import { Injectable } from "@angular/core";
import { Usuario } from "../../entities/Usuario";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http"
import { Observable, of } from "rxjs";
import { Categoria } from "src/entities/Categoria";
import { CrearUsuario } from "src/entities/CrearUsuario";
import { Telefono } from "src/entities/Telefono";
import { NumTelefono } from "src/entities/NumTelefono";


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
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
    
        const headers = {
                'Authorization': 'Basic ' + btoa(username + ':' + password)
        };

        return headers;
      }
    


    public crearUsuarioSolicitante(usuario: CrearUsuario){
        const headers = new HttpHeaders(this.getCredenciales());
        return this.httpClient.post("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/user-servlet/crear-usuario-solicitante", usuario, {observe: 'response', headers});
        
    }

    public crearUsuarioTelefonos( telefonos:Telefono){
        const headers = new HttpHeaders(this.getCredenciales());
        return this.httpClient.post("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/user-servlet/crear-telefonos", telefonos, {observe: 'response', headers});
        
    }

    public actualizarTelefono( telefonos:NumTelefono[]){
        
        return this.httpClient.put("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/user-servlet/actualizar-telefonos", telefonos, {observe: 'response'});
        
    }

    public restablecerContraseña(email:String){
        
        return this.httpClient.post("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/user-servlet/restablecer-contrasena?email="+email,{body:''});
        
    }

    public crearUsuarioEmpleador(usuario: CrearUsuario, ){
        
        return this.httpClient.post("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/user-servlet/crear-usuario-empleador", usuario, {observe: 'response'});
        
    }

    public listarCategorias(): Observable<Categoria[]> {
        return this.httpClient.get<Categoria[]>(this.API_URL + "/applicant-servlet/listar-ofertas");
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