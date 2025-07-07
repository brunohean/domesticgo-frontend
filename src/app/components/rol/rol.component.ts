import { Component } from '@angular/core';
import { ListartodosrolesComponent } from './listartodosroles/listartodosroles.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-rol',
  imports: [ListartodosrolesComponent, RouterOutlet],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.css',
})
export class RolComponent {
  constructor(public route: ActivatedRoute) {}
}
