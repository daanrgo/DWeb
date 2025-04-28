// src/app/pages/order/order-table/order-table.component.ts

import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { Order } from './order';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {
  orders: Order[] = [];
  modoEdicion: boolean = false;
  orderSeleccionado: Order | null = null;
  isCliente: boolean = false;
  currentUserId: number | null = null;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const role = this.authService.getRole();
    this.isCliente = (role === 'cliente');

    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user?.id) {
      this.currentUserId = user.id;
    }

    this.cargarOrders();
  }

  cargarOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        console.log('ORDERS RAW DATA:', data); 
        if (this.isCliente && this.currentUserId !== null) {
          this.orders = data.filter(order => order.bill?.client?.id === this.currentUserId);
        } else {
          this.orders = data;
        }
      },
      error: (error) => {
        console.error('Error cargando órdenes:', error);
      }
    });
  }

  nuevoOrder(): void {
    this.orderSeleccionado = {
      id: 0,
      quantity: 1,
      comida: { id: 0, name: '', price: 0 }, 
      bill: { id: 0, client: { id: 0, name: '' }, address: '' },
      courier: undefined,
      status: 0
    };
    this.modoEdicion = true;
  }
  

  editar(order: Order): void {
    this.orderSeleccionado = { ...order };
    this.modoEdicion = true;
  }

  eliminarOrder(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este pedido?')) {
      this.orderService.deleteOrder(id).subscribe({
        next: () => this.cargarOrders(),
        error: (error) => console.error('Error al eliminar el pedido:', error)
      });
    }
  }

  guardar(order: Order): void {
    if (order.id && order.id > 0) {
      this.orderService.updateOrder(order).subscribe({
        next: () => this.cargarOrders(),
        error: (error) => console.error('Error actualizando pedido:', error)
      });
    } else {
      this.orderService.addOrder(order).subscribe({
        next: () => this.cargarOrders(),
        error: (error) => console.error('Error creando pedido:', error)
      });
    }
    this.cancelar();
  }

  cancelar(): void {
    this.modoEdicion = false;
    this.orderSeleccionado = null;
  }

  cambiarEstado(orderId: number, nuevoEstado: number): void {
    this.orderService.updateStatus(orderId, nuevoEstado).subscribe({
      next: () => {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
          order.status = nuevoEstado;
        }
      },
      error: (error) => console.error('Error cambiando estado:', error)
    });
  }

  getEstadoTexto(status: number): string {
    switch (status) {
      case 0: return 'Pendiente';
      case 1: return 'En Proceso';
      case 2: return 'Entregado';
      default: return 'Desconocido';
    }
  }

  getEstadoClass(status: number): string {
    switch (status) {
      case 0: return 'estado-pendiente';
      case 1: return 'estado-proceso';
      case 2: return 'estado-entregado';
      default: return '';
    }
  }
}
