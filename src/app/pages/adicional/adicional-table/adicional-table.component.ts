// ✅ Nueva versión: src/app/pages/adicional/adicional-table/adicional-table.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adicional } from '../adicional-table/adicional';
import { AdicionalService } from 'src/app/services/adicional.service';

@Component({
  selector: 'app-adicional-table',
  templateUrl: './adicional-table.component.html',
  styleUrls: ['./adicional-table.component.css']
})
export class AdicionalTableComponent implements OnInit {
  adicionales: Adicional[] = [];

  constructor(
    private adicionalService: AdicionalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarAdicionales();
  }

  cargarAdicionales(): void {
    this.adicionalService.getAdicionales().subscribe({
      next: (data) => (this.adicionales = data),
      error: (err) => console.error('Error al cargar adicionales', err)
    });
  }

  nuevoAdicional(): void {
    this.router.navigate(['/adicionales/crear']);
  }

  editar(adicional: Adicional): void {
    this.router.navigate(['/adicionales/editar', adicional.id]);
  }

  eliminar(id: number): void {
    if (confirm('Confirma que deseas eliminar este adicional?')) {
      this.adicionalService.deleteAdicional(id).subscribe({
        next: () => this.adicionales = this.adicionales.filter(a => a.id !== id),
        error: (err) => console.error('Error al eliminar adicional', err)
      });
    }
  }
}
