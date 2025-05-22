// src/app/services/operator.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operator } from '../pages/operator/operator-table/operator';

@Injectable({ providedIn: 'root' })
export class OperatorService {
  private apiUrl = 'http://localhost:8010/api/operators';

  constructor(private http: HttpClient) {}
  
  getOperators(): Observable<Operator[]> {
    return this.http.get<Operator[]>(this.apiUrl);
  }

  getOperatorById(id: number): Observable<Operator> {
    return this.http.get<Operator>(`${this.apiUrl}/${id}`);
  }

  addOperator(operator: Operator): Observable<Operator> {
    return this.http.post<Operator>(this.apiUrl, operator); // POST to /api/operators
  }

  updateOperator(operator: Operator): Observable<Operator> {
    return this.http.put<Operator>(`${this.apiUrl}/${operator.id}`, operator); // PUT to /api/operators/{id}
  }

  deleteOperator(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // DELETE to /api/operators/{id}
  }
}
