// src/app/pages/courier/courier-form/courier-form.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Courier } from '../courier-table/courier';

@Component({
  selector: 'app-courier-form',
  templateUrl: './courier-form.component.html',
  styleUrls: ['./courier-form.component.css']
})
export class CourierFormComponent {
  @Input() courier: Courier = new Courier();
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
