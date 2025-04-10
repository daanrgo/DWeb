// src/app/pages/adicional/adicional-table/adicional-table.component.ts

import { Component } from '@angular/core';
import { Adicional } from '../adicional-table/adicional';

@Component({
  selector: 'app-adicional-table',
  templateUrl: './adicional-table.component.html',
  styleUrls: ['./adicional-table.component.css']
})
export class AdicionalTableComponent {
  adicionales: Adicional[] = [
    { id: 1, name: 'Queso Extra', price: 2000 },
    { id: 2, name: 'Tocineta', price: 3000 }
  ];

  adicionalSeleccionado: Adicional | null = null;
  modoEdicion: boolean = false;

  nuevoAdicional(): void {
    this.adicionalSeleccionado = new Adicional(0, '', 0);
    this.modoEdicion = true;
  }

  editar(adicional: Adicional): void {
    this.adicionalSeleccionado = { ...adicional };
    this.modoEdicion = true;
  }

  eliminar(id: number): void {
    this.adicionales = this.adicionales.filter(a => a.id !== id);
  }

  guardar(adicional: Adicional): void {
    const index = this.adicionales.findIndex(a => a.id === adicional.id);
    if (index >= 0) {
      this.adicionales[index] = adicional;
    } else {
      adicional.id = this.adicionales.length + 1;
      this.adicionales.push(adicional);
    }
    this.cancelar();
  }

  cancelar(): void {
    this.adicionalSeleccionado = null;
    this.modoEdicion = false;
  }
}
