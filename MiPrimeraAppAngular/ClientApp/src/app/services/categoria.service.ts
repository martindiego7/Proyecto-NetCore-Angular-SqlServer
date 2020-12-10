import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoriaService {

  urlBase: string;
  constructor(private http: Http, @Inject('BASE_URL') baseURL: string) {
    this.urlBase = baseURL;
  }

  public getCategoria() {
    return this.http.get(this.urlBase + "api/Categoria/listarCategorias")
      .map(res => res.json());
  }

}
