// src/app/pages/operators/operator-form/operator-form.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Operator } from '../operator-table/operator';

@Component({
  selector: 'app-operator-form',
  templateUrl: './operator-form.component.html',
  styleUrls: ['./operator-form.component.css']
})
export class OperatorFormComponent {
  @Input() operator!: Operator;
  @Input() editando: boolean = false;

  @Output() onGuardar = new EventEmitter<Operator>();
  @Output() onCancelar = new EventEmitter<void>();

  guardar(): void {
    console.log('Datos enviados desde Angular:', this.operator);
    if (
      !this.operator.username ||
      !this.operator.password ||
      !this.operator.name ||
      !this.operator.lastName ||
      !this.operator.location
    ) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    this.onGuardar.emit(this.operator);
  }

  cancelar(): void {
    this.onCancelar.emit();
  }
}
