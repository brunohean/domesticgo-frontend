import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Reserva } from '../models/reserva';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private url: string = `${base_url}/reservas`; // Ruta del Controlador en BE
  private listaActual = new Subject<Reserva[]>();

  constructor(private http: HttpClient) {}

// Metodo para listar todos los elementos
  listAll() {
    return this.http.get<Reserva[]>(`${this.url}/listado`); // Ruta del Metodo en BE
  }

  // Metodo para insertar un nuevo elemento
  insertOne(res: Reserva) {
    return this.http.post(`${this.url}/registrar`, res); // Ruta del Metodo en BE
  }

  // Metodo para actualizar o editar un elemento
  update(res: Reserva) {
    return this.http.put(`${this.url}/modificar`, res); // Ruta del Metodo en BE
  }

  // Metodo par eliminar un elemento
  deleteOne(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  // Metodo insertar requiere soporte de getList() y setList()

  getList() {
    return this.listaActual.asObservable();
  }

  setList(listaNueva: Reserva[]) {
    this.listaActual.next(listaNueva);
  }

  // Metodo actualizar o editar requiere soporte de listId()

  listId(id: number) {
    return this.http.get<Reserva>(`${this.url}/${id}`);
  }

  // Metodo para buscar elementos por valor de nombre
  search(date: Date) {
    // Fecha: date.toISOString().split('T')[0] 
    const params = { n: date.toISOString().split('T')[0] }; // Parametro 'n' tiene que ser igual al parametro en el BE
    return this.http.get<Reserva[]>(`${this.url}/buscar-fecha-reserva`, { params });
  }
}
