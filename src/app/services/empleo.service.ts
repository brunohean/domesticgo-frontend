import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Empleo } from '../models/empleo';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class EmpleoService {
  private url: string = `${base_url}/empleos`; // Ruta del Controlador en BE
  private urlListAll: string = `${this.url}/listado`;

  private listaActual = new Subject<Empleo[]>();

  constructor(private http: HttpClient) {}

  // Metodo para listar todos los elementos
  listAll() {
    return this.http.get<Empleo[]>(this.urlListAll); // Ruta del Metodo en BE
  }

  // Metodo para insertar un nuevo elemento
  insertOne(emp: Empleo) {
    return this.http.post(`${this.url}/registrar`, emp); // Ruta del Metodo en BE
  }

  // Metodo para actualizar o editar un elemento
  update(emp: Empleo) {
    return this.http.put(`${this.url}/modificar`, emp); // Ruta del Metodo en BE
  }

  // Metodo par eliminar un elemento
  deleteOne(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  // Metodo insertar requiere soporte de getList() y setList()

  getList() {
    return this.listaActual.asObservable();
  }

  setList(listaNueva: Empleo[]) {
    this.listaActual.next(listaNueva);
  }

  // Metodo actualizar o editar requiere soporte de listId()

  listId(id: number) {
    return this.http.get<Empleo>(`${this.url}/${id}`);
  }

  // Metodo para buscar elementos por valor de nombre
  search(na: string) {
    const params = { n: na }; // Parametro 'n' tiene que ser igual al parametro en el BE
    return this.http.get<Empleo[]>(`${this.url}/buscar-empleo`, { params });
  }
}
