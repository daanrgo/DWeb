// src/app/pages/cliente/cliente-detail/cliente-detail.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cliente } from '../cliente-table/cliente';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css']
})
export class ClienteDetailComponent {
  @Input() cliente!: Cliente;
  @Input() editando: boolean = false;
  @Output() onGuardar = new EventEmitter<Cliente>();
  @Output() onCancelar = new EventEmitter<void>();

  guardar(): void {
    this.onGuardar.emit(this.cliente);
  }

  cancelar(): void {
    this.onCancelar.emit();
  }
}
