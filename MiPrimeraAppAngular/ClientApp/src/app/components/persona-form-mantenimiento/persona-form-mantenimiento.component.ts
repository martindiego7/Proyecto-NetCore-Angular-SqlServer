import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { VALID } from '@angular/forms/src/model';
import { PersonaService } from '../../services/persona.service'
import { Router, ActivatedRoute } from '@angular/router'
import { promise } from 'protractor';


@Component({
  selector: 'app-persona-form-mantenimiento',
  templateUrl: './persona-form-mantenimiento.component.html',
  styleUrls: ['./persona-form-mantenimiento.component.css']
})
export class PersonaFormMantenimientoComponent implements OnInit {

  titulo: string ="";
  persona: FormGroup;
  parametro: string;
  constructor(private personaService: PersonaService, private route: Router
    , private activatedRoute: ActivatedRoute) {
    this.persona = new FormGroup({
      'idpersona': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(100)]),
      'apPaterno': new FormControl("", [Validators.required, Validators.maxLength(150)]),
      'apMaterno': new FormControl("", [Validators.required, Validators.maxLength(150)]),
      'telefono': new FormControl("", [Validators.required, Validators.maxLength(10)]),
      //con el bind hago que el this haga referencia a la clase del servicio
      'correo': new FormControl("", [Validators.required, Validators.maxLength(150), Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")], this.noRepetirCorreoInsertar.bind(this)),
      'fechaNacimiento': new FormControl("", [Validators.required])
    });

    this.activatedRoute.params.subscribe(param => {
      this.parametro = param["id"];
      if (this.parametro == "nuevo") {
        this.titulo = "Agregando una nueva persona"
      } else {
        this.titulo = "Editando informacion de una persona"
      }
    });
  }



  ngOnInit() {
    //programar (recupera la informacion)
    if (this.parametro != "nuevo") {
      this.personaService.recuperarPersona(this.parametro).subscribe(data => {
        this.persona.controls["idpersona"].setValue(data.idpersona);
        this.persona.controls["nombre"].setValue(data.nombre);
        this.persona.controls["apPaterno"].setValue(data.apPaterno);
        this.persona.controls["apMaterno"].setValue(data.apMaterno);
        this.persona.controls["telefono"].setValue(data.telefono);
        this.persona.controls["correo"].setValue(data.correo);
        this.persona.controls["fechaNacimiento"].setValue(data.fechaCadena);
      });
    }
  }

  public guardarDatos() {
    // siempre tiene que estar valido antes de agregar o editar
    if (this.persona.valid == true) {

      //C# dd/mm/yyyy
      var fecNac = this.persona.controls["fechaNacimiento"].value.split("-");
      var anio = fecNac[0];
      var mes = fecNac[1];
      var dia = fecNac[2];

      this.persona.controls["fechaNacimiento"].setValue(mes+"/"+dia+"/"+anio);
        this.personaService.agregarPersona(this.persona.value).subscribe(data => { this.route.navigate(["/mantenimientoPersona"]) });
    }

  }

  public noRepetirCorreoInsertar(control: FormControl) {
    var promesa = new Promise((resolve, rejec) => {

      if (control.value != null && control.value != "") {

        this.personaService
          .validarCorreo(this.persona.controls['idpersona'].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExiste: true });
            } else {
              resolve(null);
            }
          })
      }

    });

    return promesa;
  }
}
