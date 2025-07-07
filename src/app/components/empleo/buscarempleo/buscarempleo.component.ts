import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Empleo } from '../../../models/empleo';
import { EmpleoService } from '../../../services/empleo.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-buscarempleo',
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
  templateUrl: './buscarempleo.component.html',
  styleUrl: './buscarempleo.component.css',
})
export class BuscarempleoComponent implements OnInit {
  dataSource: MatTableDataSource<Empleo> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'nameEmployment'];
  form: FormGroup;
  valorBuscado: string = '';
  constructor(private empSer: EmpleoService, private fb: FormBuilder) {
    this.form = this.fb.group({
      empleito: [''],
    });
  }

  ngOnInit(): void {
    this.empSer.listAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.empSer.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data); // Muestra la lista actualizada
    });
    this.form.get('empleito')?.valueChanges.subscribe((value) => {
      this.valorBuscado = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.valorBuscado.trim()) {
      this.empSer.search(this.valorBuscado).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    } else {
      this.empSer.listAll().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
    }
  }
}
