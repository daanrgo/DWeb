// src/app/pages/cliente/cliente-form/cliente-form.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cliente } from '../cliente-table/cliente';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent {
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
