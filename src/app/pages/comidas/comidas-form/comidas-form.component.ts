import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comida } from '../comidas-table/comida'; // Ajusta el path si es diferente


@Component({
  selector: 'app-comidas-form',
  templateUrl: './comidas-form.component.html',
  styleUrls: ['./comidas-form.component.css']
})

@Component({
  selector: 'app-comidas-form',
  templateUrl: './comidas-form.component.html',
  styleUrls: ['./comidas-form.component.css']
})
export class ComidasFormComponent {
  @Input() comida: Comida = { id: 0, name: '', price: 0, description: '', imagen: '' };
  @Input() editando: boolean = false;
  @Output() onGuardar = new EventEmitter<Comida>();
  @Output() onCancelar = new EventEmitter<void>();

  guardarComida() {
    this.onGuardar.emit({ ...this.comida });
  }

  cancelar() {
    this.onCancelar.emit();
  }
}
