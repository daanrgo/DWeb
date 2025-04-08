  // src/app/pages/operators/operator-table/operator-table.component.ts
  
  import { Component, OnInit } from '@angular/core';
  import { Operator } from './operator';
  
  @Component({
    selector: 'app-operator-table',
    templateUrl: './operator-table.component.html',
    styleUrls: ['./operator-table.component.css']
  })
  export class OperatorTableComponent implements OnInit {
    operators: Operator[] = [
      {
        id: 1,
        username: 'oper01',
        password: 'pass01',
        name: 'Luis',
        lastName: 'Ramirez',
        location: 'Centro'
      },
      {
        id: 2,
        username: 'oper02',
        password: 'pass02',
        name: 'Maria',
        lastName: 'Torres',
        location: 'Norte'
      }
    ];
  
    ngOnInit(): void {}
  
    seleccionarOperator(operator: Operator): void {
      console.log('Operator seleccionado:', operator);
    }
  
    editarOperator(operator: Operator): void {
      console.log('Editar operator:', operator);
    }
  
    eliminarOperator(id: number): void {
      this.operators = this.operators.filter(o => o.id !== id);
      console.log('Operator eliminado con ID:', id);
    }
  }