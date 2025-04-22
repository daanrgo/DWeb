// src/app/pages/bill/bill-table/bill-table.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { Bill } from './bill';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
})
export class BillTableComponent implements OnInit {
  @Input() modoCliente: boolean = false;
  @Input() modoCourier: boolean = false;
  @Input() userId?: number;
  @Input() courierId?: number;

  bills: Bill[] = [];

  constructor(private billService: BillService) {}

  ngOnInit(): void {
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
    this.billService.delete(id).subscribe(() => this.bills = this.bills.filter(b => b.id !== id));
  }
}
