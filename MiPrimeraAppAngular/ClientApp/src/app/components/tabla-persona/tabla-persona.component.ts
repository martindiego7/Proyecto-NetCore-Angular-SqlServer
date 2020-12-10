import { Component, OnInit, Input } from '@angular/core';
import { PersonaService } from '../../services/persona.service';


@Component({
  selector: 'tabla-persona',
  templateUrl: './tabla-persona.component.html',
  styleUrls: ['./tabla-persona.component.css']
})
export class TablaPersonaComponent implements OnInit {

  @Input() personas: any;
  @Input() isMantenimiento = false;
  p: number = 1;
  cabeceras: string[] = ["Id Persona", "Nombre Completo", "Telefono", "Correo","Fecha Nacimiento"];
  constructor(private personaServices: PersonaService) {

  }

  ngOnInit() {
    this.personaServices.getPersona().subscribe(data => this.personas = data);
  }

  public eliminarPersona(idpersona) {
    if (confirm("Desea eliminar este registro ?") == true) {
      this.personaServices.eliminarPersona(idpersona).subscribe(data => {
        this.personaServices.getPersona()
          .subscribe(data => this.personas = data);
      });
    }
  }

}
