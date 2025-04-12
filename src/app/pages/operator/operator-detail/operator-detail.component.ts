// src/app/pages/operator/operator-detail/operator-detail.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Operator } from '../operator-table/operator';

@Component({
  selector: 'app-operator-detail',
  templateUrl: './operator-detail.component.html',
  styleUrls: ['./operator-detail.component.css']
})
export class OperatorDetailComponent {
  @Input() operator!: Operator;
  @Input() editando: boolean = false;

  @Output() onGuardar = new EventEmitter<Operator>();
  @Output() onCancelar = new EventEmitter<void>();

  guardar(): void {
    this.onGuardar.emit(this.operator);
  }

  cancelar(): void {
    this.onCancelar.emit();
  }
}
