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
    this.onGuardar.emit(this.operator);
  }

  cancelar(): void {
    this.onCancelar.emit();
  }
}
