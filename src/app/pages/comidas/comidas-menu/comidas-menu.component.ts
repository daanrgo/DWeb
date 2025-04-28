// File: comidas-menu.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComidasService } from 'src/app/services/comidas.service';
import { Comida } from '../comidas-table/comida';

@Component({
  selector: 'app-comidas-menu',
  templateUrl: './comidas-menu.component.html',
  styleUrls: ['./comidas-menu.component.css']
})
export class ComidasMenuComponent implements OnInit {
  comidas: Comida[] = [];
  filteredComidas: Comida[] = [];
  userId!: number;
  searchTerm: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private comidasService: ComidasService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.loadComidas();
  }

  loadComidas(): void {
    this.comidasService.getAllComidas(this.userId).subscribe({
      next: (data) => {
        this.comidas = data.map(comida => ({
          ...comida,
          imagen: this.formatImagen(comida.imagen)
        }));
        this.filteredComidas = [...this.comidas];
        console.log('Comidas cargadas:', this.comidas);
      },
      error: (err) => console.error('Error loading comidas:', err)
    });
  }

  filterComidas(): void {
    this.filteredComidas = this.comidas.filter(comida => 
      comida.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      comida.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  navigateToDetail(comidaId: number): void {
    this.router.navigate(['/comidas', this.userId, comidaId]);
  }

  private formatImagen(imagen: string): string {
    const fileName = imagen.replace(/^.*[\\\/]/, '').replace(/^images[\\\/]/, '');
    return `assets/images/${fileName}`;
  }
}
