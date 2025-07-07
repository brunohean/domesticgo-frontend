import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartodosubicacionesComponent } from './listartodosubicaciones/listartodosubicaciones.component';

@Component({
  selector: 'app-ubicacion',
  imports: [ListartodosubicacionesComponent,RouterOutlet],
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.css'
})
export class UbicacionComponent {
  constructor(public route: ActivatedRoute) {}
}
