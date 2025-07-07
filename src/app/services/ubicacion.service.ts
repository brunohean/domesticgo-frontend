import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Ubicacion } from '../models/ubicacion';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  private url: string = `${base_url}/ubicaciones`; // Ruta del Controlador en BE
  private listaActual = new Subject<Ubicacion[]>();

  constructor(private http: HttpClient) {}

  // Metodo para listar todos los elementos
  listAll() {
    return this.http.get<Ubicacion[]>(`${this.url}/listado`); // Ruta del Metodo en BE
  }

  // Metodo para insertar un nuevo elemento
  insertOne(ubi: Ubicacion) {
    return this.http.post(`${this.url}/registrar`, ubi); // Ruta del Metodo en BE
  }

  // Metodo para actualizar o editar un elemento
  update(ubi: Ubicacion) {
    return this.http.put(`${this.url}/modificar`, ubi); // Ruta del Metodo en BE
  }

  // Metodo par eliminar un elemento
  deleteOne(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  // Metodo insertar requiere soporte de getList() y setList()

  getList() {
    return this.listaActual.asObservable();
  }

  setList(listaNueva: Ubicacion[]) {
    this.listaActual.next(listaNueva);
  }

  // Metodo actualizar o editar requiere soporte de listId()

  listId(id: number) {
    return this.http.get<Ubicacion>(`${this.url}/${id}`);
  }

  // Metodo para buscar elementos por valor de nombre
  search(na: string) {
    const params = { n: na }; // Parametro 'n' tiene que ser igual al parametro en el BE
    return this.http.get<Ubicacion[]>(`${this.url}/buscar-direccion`, { params });
  }
}
