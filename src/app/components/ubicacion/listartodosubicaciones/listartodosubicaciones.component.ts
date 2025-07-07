import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UbicacionService } from '../../../services/ubicacion.service';
import { Ubicacion } from '../../../models/ubicacion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listartodosubicaciones',
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './listartodosubicaciones.component.html',
  styleUrl: './listartodosubicaciones.component.css',
})
export class ListartodosubicacionesComponent implements OnInit {
  dataSource: MatTableDataSource<Ubicacion> = new MatTableDataSource();
  displayedColumns: string[] = [
    'column1',
    'column2',
    'column3',
    'column4',
    'column5',
    'Actualizar',
    'Eliminar',
  ];

  constructor(private ubiSer: UbicacionService) {}

  ngOnInit(): void {
    this.ubiSer.listAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.ubiSer.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data); // Muestra la lista actualizada
    });
  }

  eliminar(id: number) {
    this.ubiSer.deleteOne(id).subscribe(() => {
      this.ubiSer.listAll().subscribe((data) => {
        this.ubiSer.setList(data);
        this.dataSource = new MatTableDataSource(data); // Actualiza la lista en la tabla
      });
    });
  }
}
