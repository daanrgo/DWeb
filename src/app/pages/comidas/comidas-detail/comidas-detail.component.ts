import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comida } from '../comidas-table/comida'; 

@Component({
  selector: 'app-comida-detail',
  templateUrl: './comidas-detail.component.html',
  styleUrls: ['./comidas-detail.component.css']
})
export class ComidaDetailComponent {
  @Input() comida: Comida = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    imagen: '',
    adicionales: [],
    adicionalesSeleccionados: {}
  };
  
  @Input() isEditing: boolean = false;
  @Output() save = new EventEmitter<Comida>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit(): void {
    // Preparar los adicionales seleccionados antes de emitir
    if (this.comida.adicionales) {
      this.comida.adicionalesSeleccionados = {};
      this.comida.adicionales.forEach(adicional => {
        const checkbox = document.getElementById(`adicional-${adicional.id}`) as HTMLInputElement;
        if (checkbox) {
          this.comida.adicionalesSeleccionados![adicional.id] = checkbox.checked;
        }
      });
    }
    this.save.emit(this.comida);
  }

  onCancel(): void {
    this.cancel.emit();
  }

  trackByAdicional(index: number, adicional: any): number {
    return adicional.id;
  }
}