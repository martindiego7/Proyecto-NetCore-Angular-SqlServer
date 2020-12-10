import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/Producto.Service'

@Component({
  selector: 'filtrado-producto-categoria',
  templateUrl: './filtrado-producto-categoria.component.html',
  styleUrls: ['./filtrado-producto-categoria.component.css']
})
export class FiltradoProductoCategoriaComponent implements OnInit {

  productos: any;
  constructor(private productoService: ProductoService) { }

  ngOnInit() {
  }

  public buscar(categoria) {
    if (categoria.value == "") {
      this.productoService.getProducto().subscribe(data => this.productos = data);
    } else {
      this.productoService.getFiltroProductoPorCategoria(categoria.value)
        .subscribe(data => this.productos = data);
    }
    
  }

  public limpiar(categoria) {
    this.productoService.getProducto().subscribe(data => this.productos = data);
    categoria.value = "";
  }

}
