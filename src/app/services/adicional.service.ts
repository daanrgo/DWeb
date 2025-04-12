// src/app/services/adicional.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adicional } from '../pages/adicional/adicional-table/adicional';  // Asegúrate de tener la entidad Adicional definida correctamente

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {
  private apiUrl = 'http://localhost:8010/adicionales'; // Ajusta la URL de la API a tu configuración

  constructor(private http: HttpClient) { }

  // Obtener todos los adicionales
  getAdicionales(): Observable<Adicional[]> {
    return this.http.get<Adicional[]>(this.apiUrl);
  }

  // Obtener un adicional por su ID
  getAdicionalById(id: number): Observable<Adicional> {
    return this.http.get<Adicional>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo adicional
  addAdicional(adicional: Adicional): Observable<Adicional> {
    return this.http.post<Adicional>(`${this.apiUrl}/create`, adicional);
  }

  // Actualizar un adicional existente
  updateAdicional(adicional: Adicional): Observable<Adicional> {
    return this.http.post<Adicional>(`${this.apiUrl}/update`, adicional);
  }

  // Eliminar un adicional
  deleteAdicional(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/delete/${id}`);
  }
}
