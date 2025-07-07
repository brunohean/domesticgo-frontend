import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../../models/reserva';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReservaService } from '../../../services/reserva.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrareditarreservas',
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './registrareditarreservas.component.html',
  styleUrl: './registrareditarreservas.component.css',
})
export class RegistrareditarreservasComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  reserva: Reserva = new Reserva();
  estado: boolean = true;

  id: number = 0;
  actualizamos: boolean = false;

  constructor(
    private resSer: ReservaService,
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
      bookingDate: ['', Validators.required],
      bookingDetail: ['', Validators.required],
    });
  }

  aceptar() {
    // Si el form es valido y..
    if (this.form.valid) {
      this.reserva.idReserva = this.form.value.codigo;
      this.reserva.fechaReserva = this.form.value.bookingDate;
      this.reserva.detalleReserva = this.form.value.bookingDetail;

      // Si 'actualizamos' es verdadero, significa que estamos editando un rol existente, sino ..
      if (this.actualizamos) {
        this.resSer.update(this.reserva).subscribe(() => {
          this.resSer.listAll().subscribe((data) => {
            this.resSer.setList(data);
          });
        });
      }
      // Estamos registrando un nuevo rol
      else {
        this.resSer.insertOne(this.reserva).subscribe(() => {
          this.resSer.listAll().subscribe((data) => {
            this.resSer.setList(data);
          });
        });
      }

      this.router.navigate(['reservas']); // Redirige a la lista de roles después de registrar o editar
    }
  }

  init() {
    if (this.actualizamos) {
      this.resSer.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idReserva),
          bookingDate: new FormControl(data.fechaReserva),
          bookingDetail: new FormControl(data.detalleReserva),
        });
      });
    }
  }
}
