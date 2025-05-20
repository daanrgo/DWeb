// src/app/pages/order/order-table/order-table.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BillService } from 'src/app/services/bill.service';
import { Bill } from 'src/app/pages/bill/bill-table/bill';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {
  bills: Bill[] = [];
  isCliente = false;
  isOperador = false;
  isAdmin = false;
  isCourier = false;
  currentUserId: number | null = null;

  constructor(
    private authService: AuthService,
    private billService: BillService
  ) {}

  ngOnInit(): void {
    const role = this.authService.getRole();
    this.currentUserId = this.authService.getUserId();
    this.isCliente = role === 'cliente';
    this.isOperador = role === 'operador';
    this.isAdmin = role === 'admin';
    this.isCourier = role === 'courier';

    if (this.isCliente && this.currentUserId) {
      this.billService.getByClientId(this.currentUserId).subscribe({
        next: data => this.bills = data,
        error: err => console.error('Error al obtener pedidos del cliente', err)
      });
    } else if (this.isCourier && this.currentUserId) {
      this.billService.getByCourierId(this.currentUserId).subscribe({
        next: data => this.bills = data,
        error: err => console.error('Error al obtener pedidos del courier', err)
      });
    } else {
      this.billService.getAll().subscribe({
        next: data => this.bills = data,
        error: err => console.error('Error al obtener todos los pedidos', err)
      });
    }
  }

cambiarEstado(billId: number, nuevoEstado: number): void {
  this.billService.updateStatus(billId, nuevoEstado).subscribe({
    next: () => {
      const bill = this.bills.find(b => b.id === billId);
      if (bill) bill.status = nuevoEstado;
    },
    error: err => console.error('Error actualizando estado del pedido:', err)
  });
}


  getEstadoTexto(estado: number = 0): string {
    switch (estado) {
      case 1: return 'Recibido';
      case 2: return 'Preparando';
      case 3: return 'En camino';
      case 4: return 'Entregado';
      default: return 'Desconocido';
    }
  }

  getPrecioItem(order: any): number {
    if (!order?.comida) return 0;
    const base = order.comida.price || 0;
    const extras = (order.comida.adicionales || []).reduce((sum: number, a: any) => sum + (a.price || 0), 0);
    return (base + extras) * (order.quantity || 1);
  }

  getTotal(bill: Bill): number {
    if (!bill?.orders || bill.orders.length === 0) return 0;
    return bill.orders.reduce((acc, o) => acc + this.getPrecioItem(o), 0);
  }

  getTotalGeneral(): number {
    return this.bills.reduce((sum, b) => sum + this.getTotal(b), 0);
  }

  getClienteNombre(bill: Bill): string {
    return bill?.client?.username || 'N/A';
  }

  getCourierNombre(bill: Bill): string {
    return bill?.courier?.name || 'Sin asignar';
  }

  eliminarBill(id: number): void {
    if (confirm('¿Está seguro de eliminar este pedido?')) {
      this.billService.delete(id).subscribe({
        next: () => this.bills = this.bills.filter(b => b.id !== id),
        error: err => console.error('Error eliminando pedido:', err)
      });
    }
  }
  
}
