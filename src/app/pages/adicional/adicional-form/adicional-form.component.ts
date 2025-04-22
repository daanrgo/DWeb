// src/app/pages/adicional/adicional-form/adicional-form.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adicional } from '../adicional-table/adicional';
import { AdicionalService } from 'src/app/services/adicional.service';

@Component({
  selector: 'app-adicional-form',
  templateUrl: './adicional-form.component.html',
  styleUrls: ['./adicional-form.component.css']
})
export class AdicionalFormComponent implements OnInit {
  adicional: Adicional = new Adicional(0, '', 0);
  editando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adicionalService: AdicionalService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.editando = !!id;
    if (this.editando && id) {
      this.adicionalService.getAdicionalById(+id).subscribe({
        next: (data) => this.adicional = data,
        error: (err) => console.error('Error al cargar adicional', err)
      });
    }
  }

  guardar(): void {
    const peticion = this.editando
      ? this.adicionalService.updateAdicional(this.adicional)
      : this.adicionalService.addAdicional(this.adicional);

    peticion.subscribe({
      next: () => this.router.navigate(['/adicionales']),
      error: (err) => console.error('Error al guardar adicional', err)
    });
  }

  cancelar(): void {
    this.router.navigate(['/adicionales']);
  }
}
