import { Component, OnInit } from '@angular/core';
import { Bill } from './bill';

@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent implements OnInit {
  bills: Bill[] = [
    new Bill(1, 0, new Date(), 'Calle 123', 'Operador A', 'Cliente A', 'Repartidor A', 'Efectivo'),
    new Bill(2, 1, new Date(), 'Avenida 456', 'Operador B', 'Cliente B', 'Repartidor B', 'Tarjeta')
  ];

  ngOnInit(): void {}

  seleccionarBill(bill: Bill): void {
    console.log('Seleccionado:', bill);
  }

  editarBill(bill: Bill): void {
    console.log('Editar:', bill);
  }

  eliminarBill(id: number): void {
    this.bills = this.bills.filter(b => b.id !== id);
    console.log('Eliminado Bill con ID:', id);
  }
}