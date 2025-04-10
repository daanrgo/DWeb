// src/app/pages/adicional/adicional-form/adicional-form.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Adicional } from '../adicional-table/adicional';

@Component({
  selector: 'app-adicional-form',
  templateUrl: './adicional-form.component.html',
  styleUrls: ['./adicional-form.component.css']
})
export class AdicionalFormComponent {
  @Input() adicional: Adicional = new Adicional(0, '', 0);
  @Input() editando: boolean = false;
  @Output() onGuardar = new EventEmitter<Adicional>();
  @Output() onCancelar = new EventEmitter<void>();

  guardar(): void {
    this.onGuardar.emit(this.adicional);
  }

  cancelar(): void {
    this.onCancelar.emit();
  }
}
