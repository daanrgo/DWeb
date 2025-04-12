// src/app/pages/courier/courier-detail/courier-detail.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Courier } from '../courier-table/courier';

@Component({
  selector: 'app-courier-detail',
  templateUrl: './courier-detail.component.html',
  styleUrls: ['./courier-detail.component.css']
})
export class CourierDetailComponent {
  @Input() courier!: Courier;
  @Input() editando: boolean = false;
  @Output() onGuardar = new EventEmitter<Courier>();
  @Output() onCancelar = new EventEmitter<void>();

  guardar(): void {
    this.onGuardar.emit(this.courier);
  }

  cancelar(): void {
    this.onCancelar.emit();
  }
}
