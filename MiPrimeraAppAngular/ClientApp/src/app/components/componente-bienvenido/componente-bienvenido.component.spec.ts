import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteBienvenidoComponent } from './componente-bienvenido.component';

describe('ComponenteBienvenidoComponent', () => {
  let component: ComponenteBienvenidoComponent;
  let fixture: ComponentFixture<ComponenteBienvenidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteBienvenidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteBienvenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
