// src/app/services/order.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../pages/order/order-table/order';
import { DTOIdUsuarioComidas } from '../pages/comidas/comidas-table/comida';
import { Observable } from 'rxjs';
//import { OrderStatusDTO } from '../pages/order/order-table/order-status-dto'; // Asegúrate de tener este DTO

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'http://localhost:8010/api/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

getOrdersWStatus(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/status`);
}


  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/create`, order);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/update/${order.id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  sendOrder(dto: DTOIdUsuarioComidas): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-order`, dto);
  }

  updateStatus(orderId: number, status: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-status`, { orderId, status });
  }
}
