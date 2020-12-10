import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router'

@Injectable()
export class UsuarioService {

  urlBase: string;
  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string
    , private router: Router) {
    this.urlBase = baseUrl;
  }

  public getUsuario() {
    return this.http.get(this.urlBase + "api/Usuario/listarUsuarios")
      .map(res => res.json());
  }

  public getTipoUsuario() {
    return this.http.get(this.urlBase + "api/Usuario/listartipoUsuario")
      .map(res => res.json());
  }

  public getFiltrarUsuarioPorTipo(idTipo) {
    return this.http.get(this.urlBase + "api/Usuario/filtrarUsuarioPorTipo/" + idTipo)
      .map(res => res.json());
  }
  public validarUsuario(idusuario, nombre) {
    return this.http.get(this.urlBase + "api/Usuario/validarUsuario/" + idusuario + "/" +nombre)
      .map(res => res.json());
  }

  public recuperarUsuario(idusuario) {
    return this.http.get(this.urlBase + "api/Usuario/recuperarUsuario/" + idusuario)
      .map(res => res.json());
  }

  public guardarDatos(usuario) {
    var url = this.urlBase + "api/Usuario/guardarDatos"
    return this.http.post(url, usuario).map(res => res.json());
  }

  public eliminarUsuario(idpersona) {
    var url = this.urlBase + "api/Usuario/eliminarUsuario/" + idpersona
    return this.http.get(url).map(res => res.json());
  }

  public login(usuario) {
    var url = this.urlBase + "api/Usuario/login"
    return this.http.post(url, usuario).map(res => res.json());
  }

  public obtenerVariableSession(next) {
    var url = this.urlBase + "api/Usuario/obtenerVariableSession"
    return this.http.get(url).map(res => {
      var data = res.json();
      var informacion = data.valor;
      if (informacion == "") {
        this.router.navigate(["/paginaError"]);
        return false;
      } else {
        var pagina = next["url"][0].path;
        if (data.lista != null) {
          var paginas = data.lista.map(p => p.accion);

          if (paginas.indexOf(pagina) > -1 && pagina != "Login") {
            return true;
          } else {
            this.router.navigate(["/paginaErrorPermiso"]);
            return false;
          }
        }
        return true;
      }
    });
  }

  public obtenerSession() {
    var url = this.urlBase + "api/Usuario/obtenerVariableSession"
    return this.http.get(url).map(res => {
      var data = res.json();
      var informacion = data.valor;
      if (informacion == "") {
        return false;
      } else {

        return true;
      }
    });
  }

  public cerrarSession() {
    var url = this.urlBase + "api/Usuario/cerrarSession"
    return this.http.get(url).map(res => res.json());
  }

  public listarPagina() {
    var url = this.urlBase + "api/Usuario/listarPagina"
    return this.http.get(url).map(res => res.json());
  }

  public listarTipoUsuarios() {
    var url = this.urlBase + "api/TipoUsuario/listarTipoUsuarios"
    return this.http.get(url).map(res => res.json());
  }

  public listarPaginaTipoUsuario() {
    var url = this.urlBase + "api/TipoUsuario/listarPaginaTipoUsuario"
    return this.http.get(url).map(res => res.json());
  }

  public listarPaginaRecuperar(idtipousuario) {
    var url = this.urlBase + "api/TipoUsuario/listarPaginaRecuperar/" + idtipousuario
    return this.http.get(url).map(res => res.json());
  }

  public guardarDatosTipoUsuario(tipousuario) {
    var url = this.urlBase + "api/TipoUsuario/guardarDatosTipoUsuario"
    return this.http.post(url, tipousuario).map(res => res.json());
  }

  public eliminarTipoUsuario(idtipousuario) {
    var url = this.urlBase + "api/TipoUsuario/eliminarTipoUsuario/" + idtipousuario
    return this.http.get(url).map(res => res.json());
  }

  public listarPaginasDB() {
    var url = this.urlBase + "api/Pagina/listarPaginasDB"
    return this.http.get(url).map(res => res.json());
  }

  public guardarPagina(pagina){
    var url = this.urlBase + "api/Pagina/guardarPagina"
    return this.http.post(url, pagina).map(res => res.json());
  }

  public recuperarPagina(idpagina) {
    var url = this.urlBase + "api/Pagina/recuperarPagina/" + idpagina
    return this.http.get(url).map(res => res.json());
  }

  public eliminarPagina(idpagina) {
    var url = this.urlBase + "api/Pagina/eliminarPagina/" + idpagina
    return this.http.get(url).map(res => res.json());
  }
}

