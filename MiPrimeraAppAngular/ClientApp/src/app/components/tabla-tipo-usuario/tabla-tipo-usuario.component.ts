import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'tabla-tipo-usuario',
  templateUrl: './tabla-tipo-usuario.component.html',
  styleUrls: ['./tabla-tipo-usuario.component.css']
})
export class TablaTipoUsuarioComponent implements OnInit {

  tipoUsuario: any;
  cabeceras: string[] = ["Id Tipo Usuario", "Nombre", "Descripcion"];
  @Input() isMantenimiento: boolean = false;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.listarTipoUsuarios().subscribe(data => this.tipoUsuario = data);
  }


  public eliminar(idtipousuario) {
    if (confirm("¿desea eliminar este registro permanentemente?") == true) {
      this.usuarioService.eliminarTipoUsuario(idtipousuario)
        .subscribe(data => {
          this.usuarioService.listarTipoUsuarios()
            .subscribe(data => this.tipoUsuario = data);
        });
    }
  }
}
