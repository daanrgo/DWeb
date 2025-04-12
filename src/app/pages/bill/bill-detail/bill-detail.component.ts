// src/app/pages/bill/bill-detail/bill-detail.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bill } from '../bill-table/bill';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css']
})
export class BillDetailComponent {
  @Input() bill!: Bill;
  @Input() editando: boolean = false;

  @Output() onGuardar = new EventEmitter<Bill>();
  @Output() onCancelar = new EventEmitter<void>();

  guardar(): void {
    this.onGuardar.emit(this.bill);
  }

  cancelar(): void {
    this.onCancelar.emit();
  }
}
