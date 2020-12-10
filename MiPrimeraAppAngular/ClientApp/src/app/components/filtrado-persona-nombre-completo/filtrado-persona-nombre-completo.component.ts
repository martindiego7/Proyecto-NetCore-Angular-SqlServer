import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'filtrado-persona-nombre-completo',
  templateUrl: './filtrado-persona-nombre-completo.component.html',
  styleUrls: ['./filtrado-persona-nombre-completo.component.css']
})
export class FiltradoPersonaNombreCompletoComponent implements OnInit {

  personas: any;
  constructor(private personaService: PersonaService) { }

  ngOnInit() {
  }

  public buscar(nombreCompleto) {
    this.personaService.getPersonaFiltro(nombreCompleto.value)
      .subscribe(data => this.personas = data);
  }

}
