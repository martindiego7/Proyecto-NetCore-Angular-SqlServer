import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/Producto.Service';

@Component({
  selector: 'filtrado-producto-nombre',
  templateUrl: './filtrado-producto-nombre.component.html',
  styleUrls: ['./filtrado-producto-nombre.component.css']
})
export class FiltradoProductoNombreComponent implements OnInit {

  productos: any;
  constructor(private productoService: ProductoService) { }

  ngOnInit() {
  }


  filtrarDatos(nombre) {
    if (nombre.value == "") {
      this.productoService.getProducto().subscribe(data => this.productos = data);
    } else {
      this.productoService.getFiltroPorNombreProducto(nombre.value).subscribe(data => this.productos = data);
    }

  }

  limpiar(nombre) {
    nombre.value = "";
    this.productoService.getProducto().subscribe(data => this.productos = data);
  }
}
