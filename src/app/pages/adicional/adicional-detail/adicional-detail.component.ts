// src/app/pages/adicional/adicional-detail/adicional-detail.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Adicional } from '../adicional-table/adicional';
import { AdicionalService } from 'src/app/services/adicional.service';

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

  constructor(private adicionalService: AdicionalService) {}

  guardar(): void {
    const peticion = this.adicional.id
      ? this.adicionalService.updateAdicional(this.adicional)
      : this.adicionalService.addAdicional(this.adicional);

    peticion.subscribe({
      next: (result) => this.onGuardar.emit(result),
      error: (err) => console.error('Error al guardar adicional', err)
    });
  }

  cancelar(): void {
    this.onCancelar.emit();
  }
}
