import { Component, Input, OnInit } from '@angular/core';
import { Bill } from './bill';



import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent implements OnInit {
  @Input() modoCliente: boolean = false;
  @Input() modoCourier: boolean = false;
  @Input() userId?: number;
  @Input() courierId?: number;

  bills: Bill[] = [];

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    if (this.modoCliente && this.userId) {
      this.billService.getByClientId(this.userId).subscribe({
        next: data => this.bills = data,
        error: err => console.error('Error obteniendo bills por cliente:', err)
      });
    } else if (this.modoCourier && this.courierId) {
      this.billService.getByCourierId(this.courierId).subscribe({
        next: data => this.bills = data,
        error: err => console.error('Error obteniendo bills por courier:', err)
      });
    } else {
      this.billService.getAll().subscribe({
        next: data => this.bills = data,
        error: err => console.error('Error obteniendo bills:', err)
      });
    }
  }

  eliminarBill(id: number): void {
    if (confirm('¿Está seguro de eliminar este pedido?')) {
      this.billService.delete(id).subscribe({
        next: () => this.bills = this.bills.filter(b => b.id !== id),
        error: err => console.error('Error eliminando bill:', err)
      });
    }
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

  getClienteNombre(bill: Bill): string {
    return bill?.client?.username || 'N/A';
  }

  getCourierNombre(bill: Bill): string {
    return bill?.courier?.name || 'Sin asignar';
  }
/*
  getPrecioItem(order: any): number {
    if (!order?.comida) return 0;
    
    const basePrice = order.comida.price || 0;
    const extrasPrice = (order.comida.adicionales || []).reduce(
      (sum, extra) => sum + (extra.price || 0), 0);
    return (basePrice + extrasPrice) * (order.quantity || 1);
  }

  getTotal(bill: Bill): number {
    if (!bill?.orders || bill.orders.length === 0) return 0;
    
    return bill.orders.reduce((total, order) => {
      return total + this.getPrecioItem(order);
    }, 0);
  }

  getTotalGeneral(): number {
    return this.bills.reduce((sum, bill) => sum + this.getTotal(bill), 0);
  }*/
}