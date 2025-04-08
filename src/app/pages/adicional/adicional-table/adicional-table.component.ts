// src/app/pages/adicional/adicional-table/adicional-table.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-adicional-table',
  templateUrl: './adicional-table.component.html',
  styleUrls: ['./adicional-table.component.css']
})
export class AdicionalTableComponent {

  adicionalList: Adicional[] = [
    {
      id: 1,
      name: 'Queso Extra',
      price: 2000
    },
    {
      id: 2,
      name: 'Tocineta',
      price: 3000
    }
  ];

  seleccionarAdicional(adicional: Adicional): void {
    console.log('Seleccionar adicional:', adicional);
  }

  editarAdicional(adicional: Adicional): void {
    console.log('Editar adicional:', adicional);
  }

  eliminarAdicional(id: number): void {
    this.adicionalList = this.adicionalList.filter(a => a.id !== id);
    console.log('Adicional eliminado:', id);
  }
}

interface Adicional {
  id: number;
  name: string;
  price: number;
}
