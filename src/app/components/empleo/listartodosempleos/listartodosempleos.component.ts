import { Component, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { EmpleoService } from '../../../services/empleo.service';
import { Empleo } from '../../../models/empleo';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listartodosempleos',
  imports: [MatTableModule, CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './listartodosempleos.component.html',
  styleUrl: './listartodosempleos.component.css',
})
export class ListartodosempleosComponent implements OnInit {
  dataSource: MatTableDataSource<Empleo> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'nameEmployment',
    'Actualizar', // Esta columna es para el boton de actualizar. No es parte del modelo Empleo
    'Eliminar', // Esta columna es para el boton de eliminar. No es parte del modelo Empleo
  ]; // Inicializa las columnas que voy a mostrar y como se van a llamar

  constructor(private empSer: EmpleoService) {}

  ngOnInit(): void {
    this.empSer.listAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.empSer.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data); // Muestra la lista actualizada
    });
  }

  eliminar(id: number) {
    this.empSer.deleteOne(id).subscribe(() => {
      this.empSer.listAll().subscribe((data) => {
        this.empSer.setList(data);
        this.dataSource = new MatTableDataSource(data); // Actualiza la lista en la tabla
      });
    });
  }

}
