import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rol } from '../models/rol';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private url: string = `${base_url}/roles`;

  private listaActual = new Subject<Rol[]>(); // Para manejar la lista de roles

  constructor(private http: HttpClient) {}

  // Metodo para listar todos los elementos
  listAll() {
    return this.http.get<Rol[]>(`${this.url}/listado`);
  }

    // Metodo para insertar un nuevo elemento
    insertOne(rol: Rol) {
      return this.http.post(`${this.url}/registrar`, rol); // Ruta del Metodo en BE
    }
  
    // Metodo para actualizar o editar un elemento
    update(rol: Rol) {
      return this.http.put(`${this.url}/modificar`, rol); // Ruta del Metodo en BE
    }
  
    // Metodo par eliminar un elemento
    deleteOne(id: number) {
      return this.http.delete(`${this.url}/${id}`);
    }


    // Metodo insertar requiere soporte de getList() y setList()
    
      getList() {
        return this.listaActual.asObservable();
      }
    
      setList(listaNueva: Rol[]) {
        this.listaActual.next(listaNueva);
      }
    
      // Metodo actualizar o editar requiere soporte de listId()
    
      listId(id: number) {
        return this.http.get<Rol>(`${this.url}/${id}`)
      }


        // Metodo para buscar elementos por valor de nombre
        search(na: string) {
          const params = { n: na }; // Parametro 'n' tiene que ser igual al parametro en el BE
          return this.http.get<Rol[]>(`${this.url}/buscar-rol`, { params });
        }
}
