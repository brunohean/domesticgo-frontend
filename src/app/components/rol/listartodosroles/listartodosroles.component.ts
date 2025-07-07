import { Component, OnInit } from '@angular/core';
import { RolService } from '../../../services/rol.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../models/rol';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listartodosroles',
  imports: [MatTableModule, RouterLink, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './listartodosroles.component.html',
  styleUrl: './listartodosroles.component.css',
})
export class ListartodosrolesComponent implements OnInit {
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = [
    'column1',
    'column2',
    'Actualizar',
    'Eliminar',
  ]; // Inicializa las columnas que voy a mostrar y como se van a llamar en el dataSource

  constructor(private rolServ: RolService) {}

  ngOnInit(): void {
    this.rolServ.listAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rolServ.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data); // Muestra la lista actualizada
    });
  }

  eliminar(id: number) {
    this.rolServ.deleteOne(id).subscribe(() => {
      this.rolServ.listAll().subscribe((data) => {
        this.rolServ.setList(data);
        this.dataSource = new MatTableDataSource(data); // Actualiza la lista en la tabla
      });
    });
  }
}
