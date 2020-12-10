import { Component } from '@angular/core';

@Component({
  selector: "diasSemana",
  templateUrl: "./diasSemana.component.html"
})

export class DiasSemana {
  nombre: string = "Diego";
  cursos: string[] = ["LinQ", "ADO.NET", "Angular", "Asp.net MVC"];
  persona: Object = {
    nombre: "Pepe",
    apellido: "Perez"
  };
  enlace: string = "https://www.google.com";
}
