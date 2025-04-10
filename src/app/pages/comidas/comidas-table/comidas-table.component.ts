// src/app/pages/comidas/comidas-table/comidas-table.component.ts

import { Component, OnInit } from '@angular/core';

interface Comida {
  id: number;
  name: string;
  price: number;
  description: string;
  imagen: string;
}

@Component({
  selector: 'app-comida-table',
  templateUrl: './comidas-table.component.html',
  styleUrls: ['./comidas-table.component.css']
})
export class ComidaTableComponent implements OnInit {

  comidas: Comida[] = [
    {
      id: 1,
      name: 'Hamburguesa Clásica',
      price: 15000,
      description: 'Carne, lechuga, tomate y salsa especial.',
      imagen: 'assets/images/burger2.png'
    },
    {
      id: 2,
      name: 'Pizza Margarita',
      price: 20000,
      description: 'Queso mozzarella, tomate y albahaca.',
      imagen: 'assets/images/burger3.png'
    }
  ];

  comidaSeleccionada: Comida | null = null;
  modoEdicion: boolean = false;

  ngOnInit(): void {}

  seleccionarComida(comida: Comida): void {
    console.log('Comida seleccionada:', comida);
  }

  editarComida(comida: Comida): void {
    this.comidaSeleccionada = { ...comida };
    this.modoEdicion = true;
  }

  eliminarComida(id: number): void {
    this.comidas = this.comidas.filter(c => c.id !== id);
    console.log('Comida eliminada con ID:', id);
  }

  guardarComida(comida: Comida): void {
    if (this.modoEdicion) {
      this.comidas = this.comidas.map(c => c.id === comida.id ? comida : c);
      console.log('Comida actualizada:', comida);
    } else {
      const newId = this.comidas.length > 0 ? Math.max(...this.comidas.map(c => c.id)) + 1 : 1;
      comida.id = newId;
      this.comidas.push(comida);
      console.log('Comida agregada:', comida);
    }
    this.cancelarEdicion();
  }

  cancelarEdicion(): void {
    this.comidaSeleccionada = null;
    this.modoEdicion = false;
  }
}
