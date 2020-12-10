import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'buscador-usuario-tipo-usuario',
  templateUrl: './buscador-usuario-tipo-usuario.component.html',
  styleUrls: ['./buscador-usuario-tipo-usuario.component.css']
})
export class BuscadorUsuarioTipoUsuarioComponent implements OnInit {

  tipoUsuario: any;
  @Output() tipoUsuarios: EventEmitter<any>
  constructor(private usuarioServices: UsuarioService) {
    this.tipoUsuarios = new EventEmitter();
  }

  ngOnInit() {

    this.usuarioServices.getTipoUsuario().subscribe(data => this.tipoUsuario = data);
  }

  public filtrar(tipo) {
    this.tipoUsuarios.emit(tipo);
  }

}
