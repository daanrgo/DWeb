  // src/app/pages/couriers/courier-table/courier-table.component.ts
  
  import { Component, OnInit } from '@angular/core';
  import { Courier } from './courier';
  
  @Component({
    selector: 'app-courier-table',
    templateUrl: './courier-table.component.html',
    styleUrls: ['./courier-table.component.css']
  })
  export class CourierTableComponent implements OnInit {
    couriers: Courier[] = [
      {
        id: 1,
        username: 'rider01',
        password: '1234',
        name: 'Carlos',
        lastName: 'Lopez',
        email: 'carlos@example.com',
        phone: 321654987,
        governmentId: 'CC123456',
        availabilityStatus: true
      },
      {
        id: 2,
        username: 'rider02',
        password: '5678',
        name: 'Ana',
        lastName: 'Martinez',
        email: 'ana@example.com',
        phone: 315987654,
        governmentId: 'CC789012',
        availabilityStatus: false
      }
    ];
  
    ngOnInit(): void {}
  
    seleccionarCourier(courier: Courier): void {
      console.log('Courier seleccionado:', courier);
    }
  
    editarCourier(courier: Courier): void {
      console.log('Editar courier:', courier);
    }
  
    eliminarCourier(id: number): void {
      this.couriers = this.couriers.filter(c => c.id !== id);
      console.log('Courier eliminado con ID:', id);
    }
  }