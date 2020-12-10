import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoTipoUsuarioComponent } from './mantenimiento-tipo-usuario.component';

describe('MantenimientoTipoUsuarioComponent', () => {
  let component: MantenimientoTipoUsuarioComponent;
  let fixture: ComponentFixture<MantenimientoTipoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoTipoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoTipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
