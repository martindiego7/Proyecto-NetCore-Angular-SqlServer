import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTipoUsuarioComponent } from './tabla-tipo-usuario.component';

describe('TablaTipoUsuarioComponent', () => {
  let component: TablaTipoUsuarioComponent;
  let fixture: ComponentFixture<TablaTipoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaTipoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
