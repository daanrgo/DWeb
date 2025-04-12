// src/app/services/payment-type.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentType } from '../pages/paymentType/payment-type-table/paymentType';


@Injectable({ providedIn: 'root' })
export class PaymentTypeService {
  private apiUrl = 'http://localhost:8080/api/payment-types';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PaymentType[]> {
    return this.http.get<PaymentType[]>(this.apiUrl);
  }

  getById(id: number): Observable<PaymentType> {
    return this.http.get<PaymentType>(`${this.apiUrl}/${id}`);
  }

  create(paymentType: PaymentType): Observable<PaymentType> {
    return this.http.post<PaymentType>(this.apiUrl, paymentType);
  }

  update(id: number, paymentType: PaymentType): Observable<PaymentType> {
    return this.http.put<PaymentType>(`${this.apiUrl}/${id}`, paymentType);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

