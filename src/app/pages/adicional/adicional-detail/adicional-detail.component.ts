// src/app/pages/adicional/adicional-detail/adicional-detail.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Adicional } from '../adicional-table/adicional';


@Component({
  selector: 'app-adicional-detail',
  templateUrl: './adicional-detail.component.html',
  styleUrls: ['./adicional-detail.component.css']
})
export class AdicionalDetailComponent {
  @Input() adicional: Adicional = new Adicional();
  @Input() editando: boolean = false;
  @Output() onGuardar = new EventEmitter<Adicional>();
  @Output() onCancelar = new EventEmitter<void>();

  guardar() {
    this.onGuardar.emit(this.adicional);
  }

  cancelar() {
    this.onCancelar.emit();
  }
}
