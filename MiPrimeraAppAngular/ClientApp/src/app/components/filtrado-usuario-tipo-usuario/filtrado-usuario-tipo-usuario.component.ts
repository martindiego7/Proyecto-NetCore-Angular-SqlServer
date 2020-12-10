import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'filtrado-usuario-tipo-usuario',
  templateUrl: './filtrado-usuario-tipo-usuario.component.html',
  styleUrls: ['./filtrado-usuario-tipo-usuario.component.css']
})
export class FiltradoUsuarioTipoUsuarioComponent implements OnInit {

  tipoUsuario: any;

  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit() {
  }

  public filtrar(tipo) {

    if (tipo.value == 0) {
      this.usuarioService.getUsuario().subscribe(data => this.tipoUsuario = data);
    }
    else {
      this.usuarioService.getFiltrarUsuarioPorTipo(tipo.value)
        .subscribe(data => this.tipoUsuario = data)
    }

  }

}
