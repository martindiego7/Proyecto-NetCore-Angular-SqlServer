import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonaService {

  urlBase: string;
  constructor(private http: Http, @Inject("BASE_URL") baseUrl: string) {
    this.urlBase = baseUrl;
  }

  public getPersona() {
    return this.http.get(this.urlBase + "api/Persona/listarPersonas")
      .map(res => res.json());
  }

  public getPersonaFiltro(nombreCompleto) {
    return this.http.get(this.urlBase + "api/Persona/filtrarPersonas/" + nombreCompleto)
      .map(res => res.json());
  }

  public agregarPersona(persona) {

    var url = this.urlBase + "api/Persona/guardaPersona"
    return this.http.post(url, persona).map(res => res.json());
  }

  public recuperarPersona(idpersona) {
    return this.http.get(this.urlBase + "api/Persona/recuperarPersona/" + idpersona)
      .map(res => res.json());
  }

  public eliminarPersona(idpersona) {
    return this.http.get(this.urlBase + "api/Persona/eliminarPersona/" + idpersona)
      .map(res => res.json());
  }

  public validarCorreo(id, correo) {
    return this.http.get(this.urlBase + "api/Persona/validarCorreo/" + id + "/" +correo)
      .map(res => res.json());
  }

  public listarPersonasCombo() {
    return this.http.get(this.urlBase + "api/Persona/listarPersonasCombo")
      .map(res => res.json());
  }
}
