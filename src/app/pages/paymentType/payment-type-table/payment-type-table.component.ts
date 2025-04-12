// src/app/pages/paymentType/payment-type-table/payment-type-table.component.ts

import { Component, OnInit } from '@angular/core';
import { PaymentType } from './paymentType';
import { PaymentTypeService } from 'src/app/services/payment-type.service';

@Component({
  selector: 'app-payment-type-table',
  templateUrl: './payment-type-table.component.html',
  styleUrls: ['./payment-type-table.component.css']
})
export class PaymentTypeTableComponent implements OnInit {
  paymentTypes: PaymentType[] = [];

  constructor(private paymentTypeService: PaymentTypeService) {}

  ngOnInit(): void {
    this.loadPaymentTypes();
  }

  loadPaymentTypes(): void {
    this.paymentTypeService.getAll().subscribe(data => {
      this.paymentTypes = data;
    });
  }

  seleccionarPaymentType(paymentType: PaymentType): void {
    console.log('Tipo de pago seleccionado:', paymentType);
  }

  editarPaymentType(paymentType: PaymentType): void {
    console.log('Editar tipo de pago:', paymentType);
  }

  deletePaymentType(id: number): void {
    this.paymentTypeService.delete(id).subscribe(() => {
      this.paymentTypes = this.paymentTypes.filter(pt => pt.id !== id);
    });
  }
}
