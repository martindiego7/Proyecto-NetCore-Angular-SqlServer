import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service'
import { Router } from '@angular/router'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  error: boolean = false;
  urlBase: string;
  constructor(private usuarioService: UsuarioService, private router: Router
    , @Inject('BASE_URL') baseUrl: string) {

    this.urlBase = baseUrl;
    this.login = new FormGroup({
      'nombreUsuario': new FormControl("",Validators.required),
      'contra': new FormControl("",Validators.required)
    });
  }

  ngOnInit() {
  }

  public ingresar() {
    if (this.login.valid == true) {
      this.usuarioService.login(this.login.value).subscribe(data => {
        if (data.idusuario == 0) {
          //error
          this.error = true;
        } else {
          //correcto
          //this.router.navigate(["/componenteBienvenida"]);
          window.location.href = this.urlBase + "componenteBienvenida"
          this.error = false;
          //window.location.reload();
        }
      });
    }
  }

}
