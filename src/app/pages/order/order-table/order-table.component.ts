// src/app/pages/orders/order-table/order-table.component.ts

import { Component, OnInit } from '@angular/core';
import { Order } from './order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {
  orders: Order[] = [];
  orderSeleccionado: Order | null = null;
  modoEdicion: boolean = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.cargarOrders();
  }

  cargarOrders(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  nuevoOrder(): void {
    this.orderSeleccionado = new Order();
    this.modoEdicion = true;
  }

  editar(order: Order): void {
    this.orderSeleccionado = { ...order };
    this.modoEdicion = true;
  }

  eliminarOrder(id: number): void {
    this.orderService.deleteOrder(id).subscribe(() => this.cargarOrders());
  }

  guardar(order: Order): void {
    if (order.id) {
      this.orderService.updateOrder(order).subscribe(() => this.cargarOrders());
    } else {
      this.orderService.addOrder(order).subscribe(() => this.cargarOrders());
    }
    this.cancelar();
  }

  cancelar(): void {
    this.modoEdicion = false;
    this.orderSeleccionado = null;
  }
}
