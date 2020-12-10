import { Injectable,Inject } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()

export class ProductoService {

  urlBase: string = "";

  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
    //urlBase tiene el nombre del dominio
    this.urlBase = baseUrl;
  }

  public getProducto() {
    return this.http.get(this.urlBase + "api/Producto/listarProductos")
      .map(res => res.json());
  }

  public getFiltroPorNombreProducto(nombre) {
    return this.http.get(this.urlBase + "api/Producto/filtrarProductosPorNombre/" + nombre)
      .map(res => res.json());
  }

  public getFiltroProductoPorCategoria(idcategoria) {
    return this.http.get(this.urlBase + "api/Producto/filtrarProductosPorCategoria/" + idcategoria)
      .map(res => res.json());
  }

  public obtenerProductoPorId(idproducto) {
    return this.http.get(this.urlBase + "api/Producto/obtenerProductoPorId/" + idproducto)
      .map(res => res.json());
  }

  public listarMarcas() {
    return this.http.get(this.urlBase + "api/Producto/listarMarcas")
      .map(res => res.json());
  }

  public registrarProducto(producto) {
    return this.http.post(this.urlBase + "api/Producto/registrarProducto", producto)
      .map(res => res.json());
  }

  public eliminarProducto(idproducto) {
    return this.http.get(this.urlBase + "api/Producto/eliminarProducto/" + idproducto)
      .map(res => res.json());
  }
}
