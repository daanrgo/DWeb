  // src/app/pages/paymentType/payment-type-table/payment-type-table.component.ts
  
  import { Component, OnInit } from '@angular/core';
  import { PaymentType } from './paymentType';
  
  @Component({
    selector: 'app-payment-type-table',
    templateUrl: './payment-type-table.component.html',
    styleUrls: ['./payment-type-table.component.css']
  })
  export class PaymentTypeTableComponent implements OnInit {
    paymentTypes: PaymentType[] = [
      { id: 1, description: 'Efectivo' },
      { id: 2, description: 'Tarjeta de Crédito' },
      { id: 3, description: 'Transferencia' }
    ];
  
    ngOnInit(): void {}
  
    seleccionarPaymentType(paymentType: PaymentType): void {
      console.log('Tipo de pago seleccionado:', paymentType);
    }
  
    editarPaymentType(paymentType: PaymentType): void {
      console.log('Editar tipo de pago:', paymentType);
    }
  
    eliminarPaymentType(id: number): void {
      this.paymentTypes = this.paymentTypes.filter(p => p.id !== id);
      console.log('Tipo de pago eliminado con ID:', id);
    }
  }