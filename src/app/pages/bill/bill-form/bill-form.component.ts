// src/app/pages/bills/bill-form.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BillService } from 'src/app/services/bill.service';
import { Bill } from '../bill-table/bill';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
})
export class BillFormComponent {
  bill: Partial<Bill> = {
    status: 0,
    creationDate: new Date(),
    address: '',
    client: '',
    courier: '',
    operator: '',
    paymentType: ''
  };

  constructor(private billService: BillService, private router: Router) {}

  save(): void {
    this.billService.create(this.bill).subscribe({
      next: () => this.router.navigate(['/bills']),
      error: err => console.error('Error creating bill:', err)
    });
  }
}



