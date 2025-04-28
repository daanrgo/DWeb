// src/app/services/comidas.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Comida, DTOIdUsuarioComidas } from '../pages/comidas/comidas-table/comida';

@Injectable({
  providedIn: 'root'
})
export class ComidasService {
  private apiUrl = 'http://localhost:8010/api/comidas';
  private jsonHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('Error en ComidasService:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Error:', error.error.message);
    } else {
      console.error(`Código de estado: ${error.status}, Cuerpo: ${JSON.stringify(error.error)}`);
      if (error.error && typeof error.error === 'string' && error.error.startsWith('<!DOCTYPE')) {
        console.warn('El backend está devolviendo HTML en lugar de JSON');
      }
    }
    return throwError(() => new Error('Ocurrió un error; por favor intente nuevamente.'));
  }

  getAllComidas(userId: number): Observable<Comida[]> {
    return this.http.get<DTOIdUsuarioComidas>(
      `${this.apiUrl}/${userId}`,
      { headers: this.jsonHeaders, observe: 'response' }
    ).pipe(
      map(response => {
        if (!response.body) {
          throw new Error('La respuesta del servidor está vacía');
        }
        return response.body.comidas;
      }),
      catchError(this.handleError)
    );
  }

  deleteComida(userId: number, id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${userId}/delete/${id}`,
      { headers: this.jsonHeaders }
    ).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ CORREGIDO: extrae el campo .comida del response del backend
  getComida(userId: number, id: number): Observable<Comida> {
    return this.http.get<{ user_id: number, comida: Comida }>(
      `${this.apiUrl}/${userId}/${id}`,
      { headers: this.jsonHeaders }
    ).pipe(
      map(response => {
        if (!response || !response.comida) throw new Error('Respuesta sin comida válida');
        return {
          ...response.comida,
          usuarioId: response.user_id
        };
      }),
      catchError(this.handleError)
    );
  }
  

  createComida(userId: number, comida: Omit<Comida, 'id'>): Observable<Comida> {
    return this.http.post<Comida>(
      `${this.apiUrl}/${userId}/create`,
      comida,
      { headers: this.jsonHeaders }
    ).pipe(
      catchError(this.handleError)
    );
  }
  

  updateComida(userId: number, id: number, comida: Comida): Observable<Comida> {
    return this.http.put<Comida>(
      `${this.apiUrl}/${userId}/update/${id}`,
      comida,
      { headers: this.jsonHeaders }
    ).pipe(
      catchError(this.handleError)
    );
  }
}
