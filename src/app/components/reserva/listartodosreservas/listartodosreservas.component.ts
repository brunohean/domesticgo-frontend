import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Reserva } from '../../../models/reserva';
import { ReservaService } from '../../../services/reserva.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listartodosreservas',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, CommonModule],
  templateUrl: './listartodosreservas.component.html',
  styleUrl: './listartodosreservas.component.css',
})
export class ListartodosreservasComponent implements OnInit {
  dataSource: MatTableDataSource<Reserva> = new MatTableDataSource();
  displayedColumns: string[] = [
    'column1',
    'column2',
    'column3',
    'Actualizar',
    'Eliminar',
  ];

  constructor(private resSer: ReservaService) {}

  ngOnInit(): void {
    this.resSer.listAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.resSer.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data); // Muestra la lista actualizada
    });
  }

   eliminar(id: number) {
    this.resSer.deleteOne(id).subscribe(() => {
      this.resSer.listAll().subscribe((data) => {
        this.resSer.setList(data);
        this.dataSource = new MatTableDataSource(data); // Actualiza la lista en la tabla
      });
    });
  }
}


