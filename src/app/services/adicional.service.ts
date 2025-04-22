// src/app/services/adicional.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adicional } from '../pages/adicional/adicional-table/adicional';

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {
  private apiUrl = 'http://localhost:8010/api/adicionales';

  constructor(private http: HttpClient) {}

  getAdicionales(): Observable<Adicional[]> {
    return this.http.get<Adicional[]>(this.apiUrl);
  }

  getAdicionalById(id: number): Observable<Adicional> {
    return this.http.get<Adicional>(`${this.apiUrl}/${id}`);
  }

  addAdicional(adicional: Adicional): Observable<Adicional> {
    return this.http.post<Adicional>(`${this.apiUrl}/create`, adicional);
  }

  updateAdicional(adicional: Adicional): Observable<Adicional> {
    return this.http.put<Adicional>(`${this.apiUrl}/update/${adicional.id}`, adicional);
  }

  deleteAdicional(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
