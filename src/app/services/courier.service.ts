// src/app/services/courier.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courier } from '../pages/courier/courier-table/courier';


@Injectable({ providedIn: 'root' })
export class CourierService {
  private apiUrl = 'http://localhost:8010/api/couriers';

  constructor(private http: HttpClient) {}

  getCouriers(): Observable<Courier[]> {
    return this.http.get<Courier[]>(this.apiUrl);
  }

  getCourierById(id: number): Observable<Courier> {
    return this.http.get<Courier>(`${this.apiUrl}/${id}`);
  }

  addCourier(courier: Courier): Observable<Courier> {
    return this.http.post<Courier>(`${this.apiUrl}/create`, courier);
  }

  updateCourier(courier: Courier): Observable<Courier> {
    return this.http.put<Courier>(`${this.apiUrl}/update/${courier.id}`, courier);
  }

  deleteCourier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
