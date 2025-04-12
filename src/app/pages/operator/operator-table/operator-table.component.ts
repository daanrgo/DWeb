// src/app/pages/operators/operator-table/operator-table.component.ts

import { Component, OnInit } from '@angular/core';
import { Operator } from './operator';
import { OperatorService } from 'src/app/services/operator.service';

@Component({
  selector: 'app-operator-table',
  templateUrl: './operator-table.component.html',
  styleUrls: ['./operator-table.component.css']
})
export class OperatorTableComponent implements OnInit {
  operators: Operator[] = [];
  operatorSeleccionado: Operator | null = null;
  modoEdicion: boolean = false;

  constructor(private operatorService: OperatorService) {}

  ngOnInit(): void {
    this.cargarOperators();
  }

  cargarOperators(): void {
    this.operatorService.getOperators().subscribe(data => {
      this.operators = data;
    });
  }

  nuevoOperator(): void {
    this.operatorSeleccionado = new Operator();
    this.modoEdicion = true;
  }

  editar(operator: Operator): void {
    this.operatorSeleccionado = { ...operator };
    this.modoEdicion = true;
  }

  eliminarOperator(id: number): void {
    this.operatorService.deleteOperator(id).subscribe(() => {
      this.cargarOperators();
    });
  }

  guardar(operator: Operator): void {
    if (operator.id) {
      this.operatorService.updateOperator(operator).subscribe(() => this.cargarOperators());
    } else {
      this.operatorService.addOperator(operator).subscribe(() => this.cargarOperators());
    }
    this.cancelar();
  }

  cancelar(): void {
    this.operatorSeleccionado = null;
    this.modoEdicion = false;
  }
}
