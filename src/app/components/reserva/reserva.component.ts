import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartodosreservasComponent } from './listartodosreservas/listartodosreservas.component';

@Component({
  selector: 'app-reserva',
  imports: [RouterOutlet, ListartodosreservasComponent], // Implementar RouterOutlet para que funcione la navegación
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {
constructor(public route: ActivatedRoute) {} // Generar el constructor para inyectar ActivatedRoute
}
