// src/app/pages/paymentType/payment-type.ts

export class PaymentType {
    id: number = 0;
    description: string = '';

    constructor(id: number, description: string) {
      this.id = id;
      this.description = description;
    }
  }
  