import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UsuarioService } from '../../services/usuario.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'tipo-usuario-form-mantenimiento',
  templateUrl: './tipo-usuario-form-mantenimiento.component.html',
  styleUrls: ['./tipo-usuario-form-mantenimiento.component.css']
})
export class TipoUsuarioFormMantenimientoComponent implements OnInit {

  tipoUsuario: FormGroup;
  paginas: any;
  parametro: string;
  titulo: string;
  constructor(private usuarioService: UsuarioService, private activatedRoute: ActivatedRoute
  , private router: Router) {
    this.tipoUsuario = new FormGroup({
      "idtipousuario": new FormControl("0"),
      "nombre": new FormControl("", [Validators.required, Validators.maxLength(100)]),
      "descripcion": new FormControl("", [Validators.required, Validators.maxLength(100)]),
      "valores": new FormControl("")
    });

    this.activatedRoute.params.subscribe(param => {
      this.parametro = param["id"];

      if (this.parametro == "nuevo") {
        this.titulo = "Creando un tipo usuario";
      } else {
        this.titulo = "Editanto un tipo usuario";
      }
    });

    this.usuarioService.listarPaginaTipoUsuario().subscribe(data => this.paginas = data);
  }

  ngOnInit() {
    //recuperar informacion
    if (this.parametro != "nuevo") {
      this.usuarioService.listarPaginaRecuperar(this.parametro).subscribe(res => {
        this.tipoUsuario.controls["idtipousuario"].setValue(res.idtipoUsuario);
        this.tipoUsuario.controls["nombre"].setValue(res.nombre);
        this.tipoUsuario.controls["descripcion"].setValue(res.descripcion);
        //this.tipoUsuario.controls["valores"].setValue(res.valores);
        var lista = res.listaPagina.map(res => res.idpagina);

        // dibujo la informacion

        setTimeout(() => {
          var checks = document.getElementsByClassName("check");
          var ncheck = checks.length;
          var check

          for (var i = 0; i < ncheck; i++) {
            check = checks[i];
            // manera de convertir rapidamente el valor en entero es multiplicarlo por uno como lo hago en el desarrollo
            var indice = lista.indexOf(check.name * 1);

            if (indice > -1) {
              check.checked = true;
            }
          }
        }, 500);
      });
    }
  }

  public guardarDatos() {
    if (this.tipoUsuario.valid == true) {
      this.usuarioService.guardarDatosTipoUsuario(this.tipoUsuario.value)
        .subscribe(data => {
          this.router.navigate(["/mantenimientoTipoUsuario"])
        });
    }
  }

  public verCheck() {
    var seleccionados = ""
    var checks = document.getElementsByClassName("check");
    var check;

    for (var i = 0; i < checks.length; i++) {
      check = checks[i];
      if (check.checked == true) {
        seleccionados += check.name;
        seleccionados += "$";
      }
    }
    // se elimina el ultimo caracter que queda con un guion medio
    if (seleccionados != "") seleccionados = seleccionados.substring(0, seleccionados.length - 1)

    this.tipoUsuario.controls["valores"].setValue(seleccionados);
  }
}
