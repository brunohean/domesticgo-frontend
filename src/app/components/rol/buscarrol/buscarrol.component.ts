import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-buscarrol',
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
  templateUrl: './buscarrol.component.html',
  styleUrl: './buscarrol.component.css',
})
export class BuscarRolComponent implements OnInit {
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = ['column1', 'column2']; // Inicializa las columnas que voy a mostrar y como se van a llamar en el dataSource
  form: FormGroup;
  valorBuscado: string = '';
  constructor(private rolServ: RolService, private fb: FormBuilder) {
    this.form = this.fb.group({
      inputBox1: [''],
    });
  }

  ngOnInit(): void {
    this.rolServ.listAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rolServ.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data); // Muestra la lista actualizada
    });
    this.form.get('inputBox1')?.valueChanges.subscribe((value) => {
      this.valorBuscado = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.valorBuscado.trim()) {
      this.rolServ.search(this.valorBuscado).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    } else {
      this.rolServ.listAll().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }
}
