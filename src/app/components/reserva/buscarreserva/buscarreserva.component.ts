import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Reserva } from '../../../models/reserva';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReservaService } from '../../../services/reserva.service';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buscarreserva',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    CommonModule,
    MatDatepickerModule,
    MatTableModule,
  ],
  templateUrl: './buscarreserva.component.html',
  styleUrl: './buscarreserva.component.css',
})
export class BuscarreservaComponent implements OnInit {
  dataSource: MatTableDataSource<Reserva> = new MatTableDataSource();
  displayedColumns: string[] = ['column1', 'column2', 'column3']; // Inicializa las columnas que voy a mostrar y como se van a llamar en el dataSource
  form: FormGroup;
  valorBuscado: Date = new Date();

  constructor(private resSer: ReservaService, private fb: FormBuilder) {
    this.form = this.fb.group({
      datePicker1: [''],
    });
  }

  ngOnInit(): void {
    this.resSer.listAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.resSer.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data); // Muestra la lista actualizada
    });
    this.form.get('datePicker1')?.valueChanges.subscribe((value) => {
      this.valorBuscado = value;
      this.buscar();
    });
  }

  buscar() {
    if (
      this.valorBuscado !== null &&
      this.valorBuscado !== undefined &&
      this.valorBuscado.toString() !== ''
    ) {
      this.resSer.search(this.valorBuscado).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    } else {
      this.resSer.listAll().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }
}
