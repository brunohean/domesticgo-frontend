import { Routes } from '@angular/router';
import { EmpleoComponent } from './components/empleo/empleo.component';
import { ListartodosempleosComponent } from './components/empleo/listartodosempleos/listartodosempleos.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RolComponent } from './components/rol/rol.component';
import { ListartodosrolesComponent } from './components/rol/listartodosroles/listartodosroles.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { ListartodosubicacionesComponent } from './components/ubicacion/listartodosubicaciones/listartodosubicaciones.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ListartodosreservasComponent } from './components/reserva/listartodosreservas/listartodosreservas.component';
import { RegistrareditarempleosComponent } from './components/empleo/registrareditarempleos/registrareditarempleos.component';
import { RegistrareditarrolesComponent } from './components/rol/registrareditarroles/registrareditarroles.component';
import { BuscarempleoComponent } from './components/empleo/buscarempleo/buscarempleo.component';
import { BuscarRolComponent } from './components/rol/buscarrol/buscarrol.component';
import { RegistrareditarubicacionesComponent } from './components/ubicacion/registrareditarubicaciones/registrareditarubicaciones.component';
import { BuscarUbicacionComponent } from './components/ubicacion/buscarubicacion/buscarubicacion.component';
import { RegistrareditarreservasComponent } from './components/reserva/registrareditarreservas/registrareditarreservas.component';
import { BuscarreservaComponent } from './components/reserva/buscarreserva/buscarreserva.component';
import { GeolocalizarubicacionComponent } from './components/ubicacion/geolocalizarubicacion/geolocalizarubicacion.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { guardianGuard } from './guard/guardian.guard';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
    {
    path: 'login',
    component: LoginComponent,
  },
    {
    path: 'homes',
    component: HomeComponent,
        //canActivate: [guardianGuard ],

  },
  {
    path: 'empleos', // Su ruta es localhost:4200/empleos
    component: EmpleoComponent,
    children: [
      {
        path: 'listar-todos', // Su ruta es localhost:4200/empleos/listartodos
        component: ListartodosempleosComponent,
      },
      {
        path: 'registrar-editar', // Su ruta es localhost:4200/empleos/registrareditar
        component: RegistrareditarempleosComponent,
      },
      {
        path: 'ediciones/:id', // Se agrega :id para indicar que es un parametro dinamico
        component: RegistrareditarempleosComponent, // Su ruta es localhost:4200/aplicaciones/ediciones/:id
      },
      {
        path: 'busquedas',
        component: BuscarempleoComponent, // Su ruta es localhost:4200/empleos/busquedas
      },
    ],
  },
  {
    path: 'roles', // Su ruta es localhost:4200/roles
    component: RolComponent,
    children: [
      {
        path: 'listar-todos', // Su ruta es localhost:4200/roles/listartodos
        component: ListartodosrolesComponent,
      },
      {
        path: 'registrar-editar', // Su ruta es localhost:4200/roles/registrar-editar
        component: RegistrareditarrolesComponent,
      },
      {
        path: 'ediciones/:id', // Se agrega :id para indicar que es un parametro dinamico
        component: RegistrareditarrolesComponent, // Su ruta es localhost:4200/roles/ediciones/:id
      },
      {
        path: 'busquedas',
        component: BuscarRolComponent, // Su ruta es localhost:4200/empleos/busquedas
      },
    ],
  },
  {
    path: 'ubicaciones', // Su ruta es localhost:4200/ubicaciones
    component: UbicacionComponent,
    children: [
      {
        path: 'listartodos', // Su ruta es localhost:4200/ubicaciones/listartodos
        component: ListartodosubicacionesComponent,
      },
      {
        path: 'registrar-editar', // Su ruta es localhost:4200/ubicaciones/registrar-editar
        component: RegistrareditarubicacionesComponent,
      },
      {
        path: 'ediciones/:id', // Se agrega :id para indicar que es un parametro dinamico
        component: RegistrareditarubicacionesComponent, // Su ruta es localhost:4200/roles/ediciones/:id
      },
      {
        path: 'busquedas',
        component: BuscarUbicacionComponent, // Su ruta es localhost:4200/empleos/busquedas
      },
      {
        path: 'geolocalizacion', // Su ruta es localhost:4200/ubicaciones/listartodos
        component: GeolocalizarubicacionComponent,
      },
    ],
    //canActivate: [guardianGuard ],
  },
  {
    path: 'reservas', // Su ruta es localhost:4200/reservas
    component: ReservaComponent,
    children: [
      {
        path: 'listartodos', // Su ruta es localhost:4200/ubicaciones/listartodos
        component: ListartodosreservasComponent,
      },
      {
        path: 'registrar-editar', // Su ruta es localhost:4200/ubicaciones/registrar-editar
        component: RegistrareditarreservasComponent,
      },
      {
        path: 'ediciones/:id', // Se agrega :id para indicar que es un parametro dinamico
        component: RegistrareditarreservasComponent, // Su ruta es localhost:4200/roles/ediciones/:id
      },
      {
        path: 'busquedas',
        component: BuscarreservaComponent, // Su ruta es localhost:4200/empleos/busquedas
      },
    ],
  },


  {
    path: '',
    component: InicioComponent, // Ruta por defecto
  } /*
  {
    path: '**',
    redirectTo: '', // ruta wildcard: redirige a la ruta por defecto si no encuentra coincidencias
  },*/,
];
