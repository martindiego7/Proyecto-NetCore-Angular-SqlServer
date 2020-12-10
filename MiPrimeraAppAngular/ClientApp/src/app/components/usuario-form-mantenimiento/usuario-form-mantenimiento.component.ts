import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UsuarioService } from '../../services/usuario.service'
import { PersonaService } from '../../services/persona.service'

@Component({
  selector: 'usuario-form-mantenimiento',
  templateUrl: './usuario-form-mantenimiento.component.html',
  styleUrls: ['./usuario-form-mantenimiento.component.css']
})
export class UsuarioFormMantenimientoComponent implements OnInit {

  usuario: FormGroup;
  param: string;
  titulo: string;
  tipoUsuarios: any;
  personas: any;
  ver: boolean = true;
  constructor(private activedRoute: ActivatedRoute, private usuarioService: UsuarioService,
  private personaService: PersonaService, private router: Router) {
    this.usuario = new FormGroup({
      'idusuario': new FormControl("0"),
      'nombreUsuario': new FormControl("", [Validators.required, Validators.maxLength(100)]/*, this.validarNombreUsuario.bind(this)*/),
      'contra': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'contra2': new FormControl("", [Validators.required, Validators.maxLength(100), this.validarContraseña.bind(this)]),
      'idpersona': new FormControl("0", [Validators.required]),
      'idTipoUsuario': new FormControl("0", [Validators.required])
    });

    this.activedRoute.params.subscribe(params => {
      this.param = params["id"];
      if (this.param == 'nuevo') {
        this.ver = true;
      } else {
        this.ver = false;
        this.usuario.controls["contra"].setValue("1");
        this.usuario.controls["contra2"].setValue("1");
        this.usuario.controls["idpersona"].setValue("1");
        this.usuarioService.recuperarUsuario(this.param)
          .subscribe(data => {
            this.usuario.controls["idusuario"].setValue(data.idusuario);
            this.usuario.controls["nombreUsuario"].setValue(data.nombreUsuario);
            this.usuario.controls["idTipoUsuario"].setValue(data.idTipoUsuario);
          });
        
      }
    });
  }

  ngOnInit() {
    if (this.param == "nuevo") {
      this.titulo = "Agregando Usuario Nuevo"
    } else {
      this.titulo = "Editando Usuario"
    }

    this.usuarioService.getTipoUsuario()
      .subscribe(data => this.tipoUsuarios = data);

    this.personaService.listarPersonasCombo()
      .subscribe(data => this.personas = data);
  }

  public validarContraseña(control: FormControl) {
    if (control.value != "" && control.value != null) {

      if (this.usuario.controls["contra"].value != control.value) {
        return { noIguales: true };
      }
      else {
        return null;
      }
    }
  }

  public validarNombreUsuario(control: FormControl) {
    var promesa = new Promise((resolve, rejec) => {
      if (control.value != null && control.value != "") {
        this.usuarioService.validarUsuario(this.usuario.controls['idusuario'], control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExiste: true });
            } else {
              resolve(null);
            }
          });
      }
    });

    return promesa;
  }

  public guardarDatos() {
    if (this.usuario.valid == true) {
      this.usuarioService.guardarDatos(this.usuario.value)
        .subscribe(data => {
          this.router.navigate(["/mantenimientoUsuario"])
          //this.route.navigate(["/mantenimientoPersona"]);
        });
    }
  }

}
