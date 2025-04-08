// src/app/pages/bills/bill.ts

export class Bill {
    id: number;
    status: number;
    creationDate: Date;
    address: string;
    operator?: string;
    client?: string;
    courier?: string;
    paymentType?: string;
  
    constructor(
      id: number,
      status: number,
      creationDate: Date,
      address: string,
      operator?: string,
      client?: string,
      courier?: string,
      paymentType?: string
    ) {
      this.id = id;
      this.status = status;
      this.creationDate = creationDate;
      this.address = address;
      this.operator = operator;
      this.client = client;
      this.courier = courier;
      this.paymentType = paymentType;
    }
  }