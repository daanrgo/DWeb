// src/app/pages/comidas/comidas-detail/comidas-detail.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Comida {
  id: number;
  name: string;
  price: number;
  description: string;
  imagen: string;
}

@Component({
  selector: 'app-comida-detail',
  templateUrl: './comidas-detail.component.html',
  styleUrls: ['./comidas-detail.component.css']
})
export class ComidaDetailComponent {
  @Input() comida!: Comida;
  @Input() editando = false;
  @Output() onGuardar = new EventEmitter<Comida>();
  @Output() onCancelar = new EventEmitter<void>();

  guardar(): void {
    this.onGuardar.emit(this.comida);
  }

  cancelar(): void {
    this.onCancelar.emit();
  }
}
