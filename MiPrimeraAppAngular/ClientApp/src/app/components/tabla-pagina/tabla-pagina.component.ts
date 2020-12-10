import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'tabla-pagina',
  templateUrl: './tabla-pagina.component.html',
  styleUrls: ['./tabla-pagina.component.css']
})
export class TablaPaginaComponent implements OnInit {

  titulo: string;
  paginas: any;
  cabeceras: string[] = ["Id Pagina", "Nombre Pagina", "Accion"];
  @Input() isMantenimiento: boolean = false;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.listarPaginasDB().subscribe(data => this.paginas = data);
  }

  public eliminarPagina(idpagina) {
    if (confirm("¿Desea eliminar definitivamente el registro?") == true) {
      this.usuarioService.eliminarPagina(idpagina).subscribe(data => {
        this.usuarioService.listarPaginasDB().subscribe(data => this.paginas = data);
      });
    }
    
  }

}
