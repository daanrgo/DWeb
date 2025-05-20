import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Bill } from '../pages/bill/bill-table/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private baseUrl = 'http://localhost:8010/api/bill'; // Ajusta el puerto según tu backend

  constructor(private http: HttpClient) { }

  private transformBill(bill: any): Bill {
    return {
      id: bill.id,
      status: bill.status,
      creationDate: new Date(bill.creationDate),
      address: bill.address,
      operator: bill.operator,
      client: bill.client ? {
        id: bill.client.id,
        username: bill.client.username,
        name: bill.client.name,
        lastName: bill.client.lastName,
        email: bill.client.email,
        phone: bill.client.phone,
        address: bill.client.address
      } : undefined,
      courier: bill.courier,
      paymentType: bill.payment_type || bill.paymentType,
      orders: (bill.orders || []).map((order: any) => ({
        id: order.id,
        quantity: order.quantity,
        comida: {
          id: order.comida.id,
          name: order.comida.name,
          price: order.comida.price,
          description: order.comida.description,
          imagen: order.comida.imagen,
          adicionales: order.comida.adicionales || [],
          adicionalesSeleccionados: order.comida.adicionalesSeleccionados || {}
        }
      }))
    };
  }

  getAll(): Observable<Bill[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      tap(data => console.log('Datos recibidos del backend:', data)),
      map(bills => bills.map(bill => this.transformBill(bill)))
    ); 
  }
  

  get(id: number): Observable<Bill> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(bill => this.transformBill(bill)))
  }

  getByClientId(clientId: number): Observable<Bill[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cliente/${clientId}`).pipe(
      map(bills => bills.map(bill => this.transformBill(bill))))
  }

  getByCourierId(courierId: number): Observable<Bill[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courier/${courierId}`).pipe(
      map(bills => bills.map(bill => this.transformBill(bill))))
  }

  create(billData: any): Observable<Bill> {
    return this.http.post<any>(this.baseUrl, billData).pipe(
      map(bill => this.transformBill(bill)))
  }

  update(id: number, billData: any): Observable<Bill> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, billData).pipe(
      map(bill => this.transformBill(bill)))
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  assignCourier(billId: number, courierId: number): Observable<Bill> {
    return this.http.post<any>(`${this.baseUrl}/${billId}/assign-courier/${courierId}`, {}).pipe(
      map(bill => this.transformBill(bill)))
  }

updateStatus(billId: number, newStatus: number): Observable<Bill> {
  return this.http.put<any>(`${this.baseUrl}/${billId}/status/${newStatus}`, {}).pipe(
    map(bill => this.transformBill(bill))
  );
}
}