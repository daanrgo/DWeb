// src/app/pages/paymentType/payment-type-detail/payment-type-detail.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentType } from '../payment-type-table/paymentType';

@Component({
  selector: 'app-payment-type-detail',
  templateUrl: './payment-type-detail.component.html',
  styleUrls: ['./payment-type-detail.component.css']
})
export class PaymentTypeDetailComponent {
  @Input() paymentType!: PaymentType;
  @Input() editando: boolean = false;

  @Output() onGuardar = new EventEmitter<PaymentType>();
  @Output() onCancelar = new EventEmitter<void>();

  guardar(): void {
    this.onGuardar.emit(this.paymentType);
  }

  cancelar(): void {
    this.onCancelar.emit();
  }
}
