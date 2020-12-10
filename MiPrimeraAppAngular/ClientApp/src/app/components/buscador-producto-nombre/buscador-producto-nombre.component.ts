import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'buscador-producto-nombre',
  templateUrl: './buscador-producto-nombre.component.html',
  styleUrls: ['./buscador-producto-nombre.component.css']
})
export class BuscadorProductoNombreComponent implements OnInit {


  @Output() clickButton: EventEmitter<any>;
  @Output() limpiarButton: EventEmitter<any>;
  constructor() {
    this.clickButton = new EventEmitter();
    this.limpiarButton = new EventEmitter();
  }

  ngOnInit() {
  }

  filtrar(nombre) {
    this.clickButton.emit(nombre);
  }

  limpiar(nombre) {
    this.limpiarButton.emit(nombre);
  }

}
