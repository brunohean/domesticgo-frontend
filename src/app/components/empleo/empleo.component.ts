import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartodosempleosComponent } from './listartodosempleos/listartodosempleos.component';

@Component({
  selector: 'app-empleo',
  imports: [RouterOutlet, ListartodosempleosComponent],
  templateUrl: './empleo.component.html',
  styleUrl: './empleo.component.css'
})
export class EmpleoComponent {
  constructor(public route: ActivatedRoute) {
  }
}
