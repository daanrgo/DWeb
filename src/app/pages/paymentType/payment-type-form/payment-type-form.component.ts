// src/app/pages/paymentType/payment-type-form/payment-type-form.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentType } from '../payment-type-table/paymentType';

@Component({
  selector: 'app-payment-type-form',
  templateUrl: './payment-type-form.component.html',
  styleUrls: ['./payment-type-form.component.css']
})
export class PaymentTypeFormComponent {
  @Input() paymentType: PaymentType = { id: 0, description: '' };
  @Input() editando: boolean = false;
  
  @Output() onGuardar = new EventEmitter<PaymentType>();
  @Output() onCancelar = new EventEmitter<void>();

  guardar(): void {
    if (!this.paymentType.description.trim()) return;
    this.onGuardar.emit(this.paymentType);
  }

  cancelar(): void {
    this.onCancelar.emit();
  }
}
