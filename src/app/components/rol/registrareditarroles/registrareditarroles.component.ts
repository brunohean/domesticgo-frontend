import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registrareditarroles',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './registrareditarroles.component.html',
  styleUrl: './registrareditarroles.component.css',
})
export class RegistrareditarrolesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  rol: Rol = new Rol();
  estado: boolean = true;

  id: number = 0;
  actualizamos: boolean = false;

  constructor(
    private rolSer: RolService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.actualizamos = data['id'] != null;
      this.init(); // Si hay parametros en la dirección ip: muestra el form Actualizar en lugar de Registrar al iniciar el componente
    });

    // Elementos del formulario 'form' y sus validaciones (required,max,min,long)
    this.form = this.formBuilder.group({
      codigo: [''],
      nameRol: ['', Validators.required],
    });
  }

  aceptar() {
    // Si el form es valido y..
    if (this.form.valid) {
      this.rol.idRol = this.form.value.codigo;
      this.rol.nombreRol = this.form.value.nameRol;

      // Si 'actualizamos' es verdadero, significa que estamos editando un rol existente, sino ..
      if (this.actualizamos) {
        this.rolSer.update(this.rol).subscribe(() => {
          this.rolSer.listAll().subscribe((data) => {
            this.rolSer.setList(data);
          });
        });
      }
      // Estamos registrando un nuevo rol
      else {
        this.rolSer.insertOne(this.rol).subscribe(() => {
          this.rolSer.listAll().subscribe((data) => {
            this.rolSer.setList(data);
          });
        });
      }

      this.router.navigate(['roles']); // Redirige a la lista de roles después de registrar o editar
    }
  }

  init() {
    if (this.actualizamos) {
      this.rolSer.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idRol),
          nameRol: new FormControl(data.nombreRol),
        });
      });
    }
  }
}
