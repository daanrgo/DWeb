// src/app/pages/comidas/comidas-form/comidas-form.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comida } from '../comidas-table/comida';
import { ComidasService } from 'src/app/services/comidas.service';

type NuevaComida = Omit<Comida, 'id'>;

@Component({
  selector: 'app-comidas-form',
  templateUrl: './comidas-form.component.html',
  styleUrls: ['./comidas-form.component.css']
})
export class ComidasFormComponent implements OnInit {
  comida: Comida = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    imagen: '',
    adicionales: []
  };

  isEditing = false;
  userId = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private comidasService: ComidasService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.comidasService.getComida(this.userId, +id).subscribe({
        next: (comida) => {
          this.comida = {
            ...comida,
            imagen: 'assets/images/' + comida.imagen 
          };
        },
        error: () => alert('No se pudo cargar la comida')
      });
    }
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.comidasService.updateComida(this.userId, this.comida.id, this.comida).subscribe(() => {
        this.router.navigate(['/comidas']);
      });
    } else {
      const imagenSoloNombre = this.comida.imagen.replace(/^.*[\\/]/, ''); // ✅ limpiar path, mantener solo el nombre

      const comidaToSend: NuevaComida = {
        name: this.comida.name,
        price: this.comida.price,
        description: this.comida.description,
        imagen: imagenSoloNombre, // ✅ guardar solo el nombre
        adicionales: this.comida.adicionales
      };

      this.comidasService.createComida(this.userId, comidaToSend).subscribe({
        next: () => this.router.navigate(['/comidas']),
        error: (err) => {
          console.error('Error al crear comida:', err);
          alert('Error al crear comida');
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/comidas']);
  }
}
