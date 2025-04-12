// src/app/pages/order/order-form/order-form.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../order-table/order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  @Input() order: Order = new Order();
  @Input() editando: boolean = false;
  @Output() onGuardar = new EventEmitter<Order>();
  @Output() onCancelar = new EventEmitter<void>();

  guardar(): void {
    this.onGuardar.emit(this.order);
  }

  cancelar(): void {
    this.onCancelar.emit();
  }
}
