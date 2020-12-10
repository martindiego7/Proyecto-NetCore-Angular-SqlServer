import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service'
import { Router } from '@angular/router'
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  usuario: boolean = false;
  menus: any;
  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = false;
  }

  collapse() {
    this.isExpanded = false;
  }

  ngOnInit() {
    this.usuarioService.obtenerSession().subscribe(data => {
      if (data) {
        //this.login = true;
        this.usuario = true
        // llamar a listar paginas
        this.usuarioService.listarPagina().subscribe(data => {
          this.menus = data;
        })
      } else {
        this.usuario = false;
      }
    });
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public cerrarSession() {
    this.usuarioService.cerrarSession().subscribe(data => {
      if (data.valor == "OK") {
        this.usuario = false;
        this.router.navigate(["/login"]);
      }
    });
  }
}
