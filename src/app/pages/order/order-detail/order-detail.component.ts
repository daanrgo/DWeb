// src/app/pages/orders/order-detail/order-detail.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../order-table/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
  @Input() order!: Order;
  @Input() editando: boolean = false;

  @Output() onGuardar = new EventEmitter<Order>();
  @Output() onCancelar = new EventEmitter<void>();

  guardar(): void {
    this.onGuardar.emit(this.order);
  }

  cancelar(): void {
    this.onCancelar.emit();
  }

  cerrar(): void {
    this.onCancelar.emit();
  }
}
