import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService} from '../../services/usuario.service'

@Component({
  selector: 'tabla-usuario',
  templateUrl: './tabla-usuario.component.html',
  styleUrls: ['./tabla-usuario.component.css']
})
export class TablaUsuarioComponent implements OnInit {

  @Input() usuarios: any;
  @Input() isMantenimiento = false;
  p: number = 1;
  cabeceras: string[] = ["Id Usuario", "Nombre Usuario", "Nombre Completo Persona", "Nombre Tipo Usuario"];
  constructor(private usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.usuarioService.getUsuario().subscribe(data => this.usuarios = data);
  }


  public eliminarUsuario(idpersona) {
    if (confirm("¿Desea eliminar este registro?") == true) {
      this.usuarioService.eliminarUsuario(idpersona).subscribe(data => {
        this.usuarioService.getUsuario().subscribe(data => this.usuarios = data);
      });
    }
  }

}
