import { Component, OnInit, Input } from '@angular/core';
import { ProductoService } from '../../services/Producto.Service';

@Component({
  selector: 'tabla-producto',
  templateUrl: './tabla-producto.component.html',
  styleUrls: ['./tabla-producto.component.css']
})
export class TablaProductoComponent implements OnInit {

  @Input() productos: any;
  @Input() isMantenimiento = false;
  cabeceras: string[] = ["Id Producto", "Nombre", "Precio", "Stock", "Nombre Categoria"];
  p: number = 1;
  constructor(private producto: ProductoService) {

  }

  ngOnInit() {
    this.producto.getProducto().subscribe(
      data => this.productos = data
    );
  }

  public eliminarProducto(idproducto) {
    if (confirm("¿Desea eliminar el registro?") == true) {
      this.producto.eliminarProducto(idproducto).subscribe(data => {
        this.producto.getProducto().subscribe(
          data => this.productos = data
        );
      });
    }
  }

}
