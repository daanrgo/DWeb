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

  getAll(): Observable<Adicional[]> {
    return this.http.get<Adicional[]>(this.apiUrl);
  }

  getById(id: number): Observable<Adicional> {
    return this.http.get<Adicional>(`${this.apiUrl}/${id}`);
  }

  create(adicional: Adicional): Observable<Adicional> {
    return this.http.post<Adicional>(`${this.apiUrl}/create`, adicional);
  }

  update(adicional: Adicional): Observable<Adicional> {
    return this.http.post<Adicional>(`${this.apiUrl}/update`, adicional);
  }

  delete(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/delete/${id}`);
  }
}
