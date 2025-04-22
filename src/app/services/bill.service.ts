// src/app/services/bill.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bill } from '../pages/bill/bill-table/bill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private baseUrl = 'http://localhost:8080/api/bills';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.baseUrl);
  }

  get(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.baseUrl}/${id}`);
  }

  getByClientId(clientId: number): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.baseUrl}/cliente/${clientId}`);
  }

  getByCourierId(courierId: number): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.baseUrl}/courier/${courierId}`);
  }

  create(billData: any): Observable<Bill> {
    return this.http.post<Bill>(this.baseUrl, billData);
  }

  update(bill: Bill): Observable<Bill> {
    return this.http.put<Bill>(`${this.baseUrl}/${bill.id}`, bill);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  assignCourier(billId: number, courierId: number): Observable<Bill> {
    return this.http.post<Bill>(`${this.baseUrl}/${billId}/assign-courier/${courierId}`, {});
  }

  updateStatus(billId: number, newStatus: number): Observable<Bill> {
    return this.http.post<Bill>(`${this.baseUrl}/${billId}/status`, { status: newStatus });
  }
}
