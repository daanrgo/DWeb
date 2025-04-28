// src/app/pages/order/order-form/order-form.component.ts
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Order } from '../order-table/order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  @Input() order!: Order;
  @Input() editando: boolean = false;
  @Output() onGuardar = new EventEmitter<Order>();
  @Output() onCancelar = new EventEmitter<void>();

  comidaId: number = 0;
  billId: number = 0;

  ngOnInit(): void {
    if (this.order?.comida?.id) {
      this.comidaId = this.order.comida.id;
    }
    if (this.order?.bill?.id) {
      this.billId = this.order.bill.id;
    }
  }

  guardar(): void {
    if (this.order.comida) {
      this.order.comida.id = this.comidaId;
    }
    if (this.order.bill) {
      this.order.bill.id = this.billId;
    }
    this.onGuardar.emit(this.order);
  }

  cancelar(): void {
    this.onCancelar.emit();
  }
}
