  // src/app/pages/orders/order-table/order-table.component.ts
  
  import { Component, OnInit } from '@angular/core';
  import { Order } from './order';
  
  @Component({
    selector: 'app-order-table',
    templateUrl: './order-table.component.html',
    styleUrls: ['./order-table.component.css']
  })
  export class OrderTableComponent implements OnInit {
    orders: Order[] = [
      {
        id: 1,
        quantity: 2,
        comidaId: 101,
        billId: 201
      },
      {
        id: 2,
        quantity: 1,
        comidaId: 102,
        billId: 202
      }
    ];
  
    ngOnInit(): void {}
  
    seleccionarOrder(order: Order): void {
      console.log('Order seleccionada:', order);
    }
  
    editarOrder(order: Order): void {
      console.log('Editar order:', order);
    }
  
    eliminarOrder(id: number): void {
      this.orders = this.orders.filter(o => o.id !== id);
      console.log('Order eliminada con ID:', id);
    }
  }