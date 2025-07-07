import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Ubicacion } from '../../../models/ubicacion';
import { UbicacionService } from '../../../services/ubicacion.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-geolocalizarubicacion',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './geolocalizarubicacion.component.html',
  styleUrl: './geolocalizarubicacion.component.css',
})
export class GeolocalizarubicacionComponent implements OnInit {
  dataSource: MatTableDataSource<Ubicacion> = new MatTableDataSource();
  displayedColumns: string[] = [
    'column1',
    'Geolocalizar',
  ];

  mostrarMapaFlag = false;
  private map: any;
  private marcador: any;

  constructor(
    private ubiSer: UbicacionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.ubiSer.listAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.ubiSer.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data); // Muestra la lista actualizada
    });
  }

  async mostrarMapa(ubicacion: Ubicacion) {
    this.mostrarMapaFlag = true;

    // Esperamos que el HTML del mapa se renderice antes de inicializar
    setTimeout(async () => {
      const L = await import('leaflet');
      const iconoPersonalizado = L.icon({
        iconUrl: 'assets/leaflet/marker-icon.png',
        iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      if (this.map) {
        // Si el mapa ya existe, destruirlo antes de crear uno nuevo
        this.map.remove();
      }

      this.map = L.map('map').setView(
        [Number(ubicacion.latitud), Number(ubicacion.longitud)],
        14
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);

      this.marcador = L.marker([
        Number(ubicacion.latitud),
        Number(ubicacion.longitud),
      ], { icon: iconoPersonalizado })
        .addTo(this.map)
        .bindPopup(`Ubicación: ${ubicacion.direccion}`)
        .openPopup();
    }, 0);
  }

  eliminar(id: number) {
    this.ubiSer.deleteOne(id).subscribe(() => {
      this.ubiSer.listAll().subscribe((data) => {
        this.ubiSer.setList(data);
        this.dataSource = new MatTableDataSource(data); // Actualiza la lista en la tabla
        this.snackBar.open('Ubicación eliminada', 'Cerrar', { duration: 2500 });
      });
    });
  }
}
