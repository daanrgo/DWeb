// src/app/pages/comidas/comidas-form/comidas-form.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comida } from '../comidas-table/comida';
import { ComidasService } from 'src/app/services/comidas.service';
import { Adicional } from 'src/app/pages/adicional/adicional-table/adicional';
import { AdicionalService } from 'src/app/services/adicional.service';

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

  adicionalesDisponibles: Adicional[] = [];
  isEditing = false;
  userId = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private comidasService: ComidasService,
    private adicionalService: AdicionalService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.adicionalService.getAdicionales().subscribe({
      next: (data) => this.adicionalesDisponibles = data,
      error: () => console.error('No se pudieron cargar los adicionales')
    });

    if (id) {
      this.isEditing = true;
      this.comidasService.getComida(this.userId, +id).subscribe({
        next: (comida) => {
          this.comida = {
            ...comida,
            imagen: 'assets/images/' + comida.imagen,
            adicionales: comida.adicionales ?? []
          };
        },
        error: () => alert('No se pudo cargar la comida')
      });
    }
  }

  toggleAdicional(adicional: Adicional): void {
    if (!this.comida.adicionales) this.comida.adicionales = [];

    const index = this.comida.adicionales.findIndex(a => a.id === adicional.id);
    if (index > -1) {
      this.comida.adicionales.splice(index, 1);
    } else {
      this.comida.adicionales.push(adicional);
    }
  }

  isAdicionalSeleccionado(adicional: Adicional): boolean {
    return !!this.comida.adicionales?.some(a => a.id === adicional.id);
  }

  onSubmit(): void {
    const imagenSoloNombre = this.comida.imagen.replace(/^.*[\\/]/, '');

    const comidaInput = {
      name: this.comida.name,
      price: this.comida.price,
      description: this.comida.description,
      imagen: imagenSoloNombre,
      adicionalesIds: this.comida.adicionales?.map(a => a.id) ?? []
    };

    const obs = this.isEditing
      ? this.comidasService.updateComida(this.userId, this.comida.id, comidaInput)
      : this.comidasService.createComida(this.userId, comidaInput);

    obs.subscribe({
      next: () => this.router.navigate(['/comidas']),
      error: (err) => {
        console.error('Error al guardar comida:', err);
        alert('Error al guardar comida');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/comidas']);
  }
}
