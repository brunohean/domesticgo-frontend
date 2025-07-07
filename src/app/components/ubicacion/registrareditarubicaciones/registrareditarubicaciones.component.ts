import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Ubicacion } from '../../../models/ubicacion';
import { UbicacionService } from '../../../services/ubicacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-registrareditarubicaciones',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './registrareditarubicaciones.component.html',
  styleUrl: './registrareditarubicaciones.component.css',
})
export class RegistrareditarubicacionesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  ubicacion: Ubicacion = new Ubicacion();
  estado: boolean = true;

  id: number = 0;
  actualizamos: boolean = false;

  constructor(
    private ubiServ: UbicacionService,
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
      addressUbi: ['', Validators.required],
      latitudeUbi: ['', Validators.required],
      lengthUbi: ['', Validators.required],
      linkUbi: ['', Validators.required],
    });
  }

  aceptar() {
    // Si el form es valido y..
    if (this.form.valid) {
      this.ubicacion.idUbicacion = this.form.value.codigo;
      this.ubicacion.direccion = this.form.value.addressUbi;
      this.ubicacion.latitud = this.form.value.latitudeUbi;
      this.ubicacion.longitud = this.form.value.lengthUbi;
      this.ubicacion.enlaceUbicacion = this.form.value.linkUbi;

      // Si 'actualizamos' es verdadero, significa que estamos editando un rol existente, sino ..
      if (this.actualizamos) {
        this.ubiServ.update(this.ubicacion).subscribe(() => {
          this.ubiServ.listAll().subscribe((data) => {
            this.ubiServ.setList(data);
          });
        });
      }
      // Estamos registrando un nuevo rol
      else {
        this.ubiServ.insertOne(this.ubicacion).subscribe(() => {
          this.ubiServ.listAll().subscribe((data) => {
            this.ubiServ.setList(data);
          });
        });
      }

      this.router.navigate(['ubicaciones']); // Redirige a la lista de roles después de registrar o editar
    }
  }

  init() {
    if (this.actualizamos) {
      this.ubiServ.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idUbicacion),
          addressUbi: new FormControl(data.direccion),
          latitudeUbi: new FormControl(data.latitud),
          lengthUbi: new FormControl(data.longitud),
          linkUbi: new FormControl(data.enlaceUbicacion),
        });
      });
    }
  }
}
