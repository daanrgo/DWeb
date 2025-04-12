import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { Bill } from './bill';

@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
})
export class BillTableComponent implements OnInit {
  bills: Bill[] = [];

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.billService.getAll().subscribe({
      next: (data) => this.bills = data,
      error: (err) => console.error('Error fetching bills:', err)
    });
  }
}
