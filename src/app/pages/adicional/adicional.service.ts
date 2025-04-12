// src/app/pages/adicional/adicional.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Adicional } from './adicional-table/adicional';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {
  private apiUrl = 'http://localhost:8080/adicionales';

  constructor(private http: HttpClient) {}

  listar(): Observable<Adicional[]> {
    return this.http.get<Adicional[]>(this.apiUrl);
  }

  guardar(adicional: Adicional): Observable<Adicional> {
    return adicional.id ? this.http.put<Adicional>(`${this.apiUrl}/${adicional.id}`, adicional)
                        : this.http.post<Adicional>(this.apiUrl, adicional);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
