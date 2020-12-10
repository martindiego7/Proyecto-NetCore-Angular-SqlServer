import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//importar lo siguiente para trabajar con formularios
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

//servicios
import { ProductoService } from './services/Producto.Service';
import { CategoriaService } from './services/categoria.service';
import { PersonaService } from './services/persona.service';
import { UsuarioService } from './services/usuario.service';

//registro de componentes
import { ButtonAgregar } from './components/button/Button.component';
import { DiasSemana } from './components/DiasSemana/diasSemana.component';
import { TablaProductoComponent } from './components/tabla-producto/tabla-producto.component';
import { HttpModule } from '@angular/http';
import { BuscadorProductoNombreComponent } from './components/buscador-producto-nombre/buscador-producto-nombre.component';
import { FiltradoProductoNombreComponent } from './components/filtrado-producto-nombre/filtrado-producto-nombre.component';
import { BuscadorProductoCategoriaComponent } from './components/buscador-producto-categoria/buscador-producto-categoria.component';
import { FiltradoProductoCategoriaComponent } from './components/filtrado-producto-categoria/filtrado-producto-categoria.component';
import { TablaPersonaComponent } from './components/tabla-persona/tabla-persona.component';
import { BuscadorPersonaNombreCompletoComponent } from './components/buscador-persona-nombre-completo/buscador-persona-nombre-completo.component';
import { FiltradoPersonaNombreCompletoComponent } from './components/filtrado-persona-nombre-completo/filtrado-persona-nombre-completo.component';
import { BuscadorUsuarioTipoUsuarioComponent } from './components/buscador-usuario-tipo-usuario/buscador-usuario-tipo-usuario.component';
import { FiltradoUsuarioTipoUsuarioComponent } from './components/filtrado-usuario-tipo-usuario/filtrado-usuario-tipo-usuario.component';
import { TablaUsuarioComponent } from './components/tabla-usuario/tabla-usuario.component';
import { MantenimientoPersonaComponent } from './components/mantenimiento-persona/mantenimiento-persona.component';
import { PersonaFormMantenimientoComponent } from './components/persona-form-mantenimiento/persona-form-mantenimiento.component';
import { MantenimientoProductoComponent } from './components/mantenimiento-producto/mantenimiento-producto.component';
import { ProductoFormMantenimientoComponent } from './components/producto-form-mantenimiento/producto-form-mantenimiento.component';

//ngx pagination

import { NgxPaginationModule } from 'ngx-pagination';
import { MantenimientoUsuarioComponent } from './components/mantenimiento-usuario/mantenimiento-usuario.component';
import { UsuarioFormMantenimientoComponent } from './components/usuario-form-mantenimiento/usuario-form-mantenimiento.component';
import { LoginComponent } from './components/login/login.component';
import { PaginaErrorLoginComponent } from './components/pagina-error-login/pagina-error-login.component';
import { PermisoErrorPaginaComponent } from './components/permiso-error-pagina/permiso-error-pagina.component';
import { ComponenteBienvenidoComponent } from './components/componente-bienvenido/componente-bienvenido.component';

//guards
import { SeguridadGuard } from './components/guards/seguridad.guard';
import { MantenimientoTipoUsuarioComponent } from './components/mantenimiento-tipo-usuario/mantenimiento-tipo-usuario.component';
import { TipoUsuarioFormMantenimientoComponent } from './components/tipo-usuario-form-mantenimiento/tipo-usuario-form-mantenimiento.component';
import { TablaTipoUsuarioComponent } from './components/tabla-tipo-usuario/tabla-tipo-usuario.component';
import { TablaPaginaComponent } from './components/tabla-pagina/tabla-pagina.component';
import { MantenimientoPaginaComponent } from './components/mantenimiento-pagina/mantenimiento-pagina.component';
import { PaginaFormMantenimientoComponent } from './components/pagina-form-mantenimiento/pagina-form-mantenimiento.component';
import { NoEncontroInformacionComponent } from './components/no-encontro-informacion/no-encontro-informacion.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ButtonAgregar,
    DiasSemana,
    TablaProductoComponent,
    BuscadorProductoNombreComponent,
    FiltradoProductoNombreComponent,
    BuscadorProductoCategoriaComponent,
    FiltradoProductoCategoriaComponent,
    TablaPersonaComponent,
    BuscadorPersonaNombreCompletoComponent,
    FiltradoPersonaNombreCompletoComponent,
    BuscadorUsuarioTipoUsuarioComponent,
    FiltradoUsuarioTipoUsuarioComponent,
    TablaUsuarioComponent,
    MantenimientoPersonaComponent,
    PersonaFormMantenimientoComponent,
    MantenimientoProductoComponent,
    ProductoFormMantenimientoComponent,
    MantenimientoUsuarioComponent,
    UsuarioFormMantenimientoComponent,
    LoginComponent,
    PaginaErrorLoginComponent,
    PermisoErrorPaginaComponent,
    ComponenteBienvenidoComponent,
    MantenimientoTipoUsuarioComponent,
    TipoUsuarioFormMantenimientoComponent,
    TablaTipoUsuarioComponent,
    TablaPaginaComponent,
    MantenimientoPaginaComponent,
    PaginaFormMantenimientoComponent,
    NoEncontroInformacionComponent
  ],
  imports: [
    HttpModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: 'filtrarProductoCategoria', component: FiltradoProductoCategoriaComponent, pathMatch: 'full', canActivate: [SeguridadGuard] },
      { path: 'filtradoProductoNombre', component: FiltradoProductoNombreComponent, canActivate: [SeguridadGuard]  },
      { path: 'filtradoPersonaNombreCompleto', component: FiltradoPersonaNombreCompletoComponent, canActivate: [SeguridadGuard]  },
      { path: 'filtradoUsuarioTipo', component: FiltradoUsuarioTipoUsuarioComponent, canActivate: [SeguridadGuard]  },
      { path: 'diaSemana', component: DiasSemana },
      { path: 'mantenimientoPersona', component: MantenimientoPersonaComponent, canActivate: [SeguridadGuard] },
      { path: 'personaFormMantenimiento/:id', component: PersonaFormMantenimientoComponent, canActivate: [SeguridadGuard] },
      { path: 'mantenimientoProducto', component: MantenimientoProductoComponent, canActivate: [SeguridadGuard] },
      { path: 'productoFormMantenimiento/:id', component: ProductoFormMantenimientoComponent, canActivate: [SeguridadGuard] },
      { path: 'mantenimientoUsuario', component: MantenimientoUsuarioComponent, canActivate: [SeguridadGuard] },
      { path: 'usuarioFormMantenimiento/:id', component: UsuarioFormMantenimientoComponent, canActivate: [SeguridadGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'paginaError', component: PaginaErrorLoginComponent },
      { path: 'paginaErrorPermiso', component: PermisoErrorPaginaComponent },
      { path: 'componenteBienvenida', component: ComponenteBienvenidoComponent },
      { path: 'mantenimientoTipoUsuario', component: MantenimientoTipoUsuarioComponent, canActivate: [SeguridadGuard] },
      { path: 'tipoUsuarioFormMantenimiento/:id', component: TipoUsuarioFormMantenimientoComponent, canActivate: [SeguridadGuard] },
      { path: 'mantenimientoPagina', component: MantenimientoPaginaComponent, canActivate: [SeguridadGuard] },
      { path: 'paginaFormMantenimiento/:id', component: PaginaFormMantenimientoComponent , canActivate: [SeguridadGuard] },
      { path: 'noEncontroInformacion', component: NoEncontroInformacionComponent }
    ])
  ],
  providers: [ProductoService, CategoriaService, PersonaService, UsuarioService, SeguridadGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
