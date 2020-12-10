import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'pagina-form-mantenimiento',
  templateUrl: './pagina-form-mantenimiento.component.html',
  styleUrls: ['./pagina-form-mantenimiento.component.css']
})
export class PaginaFormMantenimientoComponent implements OnInit {

  titulo: string;
  parametro: string;
  pagina: FormGroup;
  constructor(private router: Router, private usuarioService: UsuarioService,
  private activatedRoute: ActivatedRoute) {
    this.pagina = new FormGroup({
      "idpagina": new FormControl("0"),
      "mensaje": new FormControl("",[Validators.required,Validators.maxLength(100)]),
      "accion": new FormControl("", [Validators.required, Validators.maxLength(100)]),
      "bvisible": new FormControl("1")
    });

    this.activatedRoute.params.subscribe(param => {
      this.parametro = param["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Agregando una pagina nueva";
      } else {
        this.titulo = "Editanto una pagina";
      }

    });
  }

  ngOnInit() {
    if (this.parametro != "nuevo") {
      //recuperar y mostrar informacion
      this.usuarioService.recuperarPagina(this.parametro).subscribe(data => {
        if (data.accion == null) {
          this.router.navigate(["/noEncontroInformacion"]);
        } else {
          this.pagina.controls["idpagina"].setValue(data.idpagina);
          this.pagina.controls["mensaje"].setValue(data.mensaje);
          this.pagina.controls["accion"].setValue(data.accion);
          this.pagina.controls["bvisible"].setValue(data.bVisible.toString());
        }
      });
    }
  }

  public guardarDatos() {
    if (this.pagina.valid == true) {
      this.usuarioService.guardarPagina(this.pagina.value).subscribe(data => {
        this.router.navigate(["/mantenimientoPagina"]);
      });
    }
  }

}
