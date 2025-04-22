// src/app/pages/comidas/comidas-table/comidas-table.component.ts

import { Component, OnInit } from '@angular/core';
import { ComidasService } from 'src/app/services/comidas.service';
import { Comida } from './comida';

@Component({
  selector: 'app-comidas-table',
  templateUrl: './comidas-table.component.html',
  styleUrls: ['./comidas-table.component.css']
})
export class ComidasTableComponent implements OnInit {
  comidas: Comida[] = [];
  currentUserId = 1;
  isLoading = true;
  errorMessage = '';

  constructor(private comidasService: ComidasService) {}

  ngOnInit(): void {
    this.loadComidas();
  }

  loadComidas(): void {
    this.isLoading = true;
    this.comidasService.getAllComidas(this.currentUserId).subscribe({
      next: (comidas: Comida[]) => {
        this.comidas = comidas.map(c => ({
          ...c,
          imagen: this.formatImagen(c.imagen) 
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar las comidas';
        this.isLoading = false;
        console.error('Error:', err);
      }
    });
  }

  deleteComida(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.comidasService.deleteComida(this.currentUserId, id).subscribe({
        next: () => {
          this.comidas = this.comidas.filter(c => c.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('No se pudo eliminar la comida');
        }
      });
    }
  }

  private formatImagen(imagen: string): string {
    const fileName = imagen.replace(/^.*[\\\/]/, '').replace(/^images[\\\/]/, '');
    return `assets/images/${fileName}`;
  }
}
