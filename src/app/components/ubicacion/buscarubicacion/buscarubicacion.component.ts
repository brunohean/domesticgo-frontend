import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Ubicacion } from '../../../models/ubicacion';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UbicacionService } from '../../../services/ubicacion.service';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buscarubicacion',
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatLabel,
    MatInput,
  ],
  templateUrl: './buscarubicacion.component.html',
  styleUrl: './buscarubicacion.component.css',
})
export class BuscarUbicacionComponent implements OnInit {
  dataSource: MatTableDataSource<Ubicacion> = new MatTableDataSource();
  displayedColumns: string[] = [
    'column1',
    'column2',
    'column3',
    'column4',
    'column5',
  ]; // Inicializa las columnas que voy a mostrar y como se van a llamar en el dataSource
  form: FormGroup;
  valorBuscado: string = '';
  constructor(private ubiSer: UbicacionService, private fb: FormBuilder) {
    this.form = this.fb.group({
      inputBox1: [''],
    });
  }

  ngOnInit(): void {
    this.ubiSer.listAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.ubiSer.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data); // Muestra la lista actualizada
    });
    this.form.get('inputBox1')?.valueChanges.subscribe((value) => {
      this.valorBuscado = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.valorBuscado.trim()) {
      this.ubiSer.search(this.valorBuscado).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    } else {
      this.ubiSer.listAll().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }
}
