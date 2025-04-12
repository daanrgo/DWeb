// src/app/pages/courier/courier-table/courier-table.component.ts

import { Component, OnInit } from '@angular/core';
import { Courier } from './courier';
import { CourierService } from 'src/app/services/courier.service';

@Component({
  selector: 'app-courier-table',
  templateUrl: './courier-table.component.html',
  styleUrls: ['./courier-table.component.css']
})
export class CourierTableComponent implements OnInit {
  couriers: Courier[] = [];
  courierSeleccionado: Courier | null = null;
  modoEdicion: boolean = false;

  constructor(private courierService: CourierService) {}

  ngOnInit(): void {
    this.cargarCouriers();
  }

  cargarCouriers(): void {
    this.courierService.getCouriers().subscribe(couriers => {
      this.couriers = couriers;
    });
  }

  nuevoCourier(): void {
    this.courierSeleccionado = new Courier();
    this.modoEdicion = true;
  }

  editarCourier(courier: Courier): void {
    this.courierSeleccionado = { ...courier };
    this.modoEdicion = true;
  }

  eliminarCourier(id: number): void {
    this.courierService.deleteCourier(id).subscribe(() => {
      this.cargarCouriers();
    });
  }

  guardarCourier(courier: Courier): void {
    const esNuevo = !courier.id || courier.id === 0;
    const op = esNuevo
      ? this.courierService.addCourier(courier)
      : this.courierService.updateCourier(courier);

    op.subscribe(() => {
      this.cargarCouriers();
      this.cancelar();
    });
  }

  cancelar(): void {
    this.modoEdicion = false;
    this.courierSeleccionado = null;
  }
}
