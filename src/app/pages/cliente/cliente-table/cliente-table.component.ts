  // src/app/pages/clientes/cliente-table/cliente-table.component.ts
  
  import { Component, OnInit } from '@angular/core';
  import { Cliente } from './cliente';
  
  @Component({
    selector: 'app-cliente-table',
    templateUrl: './cliente-table.component.html',
    styleUrls: ['./cliente-table.component.css']
  })
  export class ClienteTableComponent implements OnInit {
    clientes: Cliente[] = [
      {
        id: 1,
        username: 'cliente1',
        password: 'abcd',
        name: 'Pedro',
        lastName: 'Ramirez',
        email: 'pedro@example.com',
        phone: 310123456,
        address: 'Calle 10 #45-78'
      },
      {
        id: 2,
        username: 'cliente2',
        password: 'efgh',
        name: 'Luisa',
        lastName: 'Fernandez',
        email: 'luisa@example.com',
        phone: 320987654,
        address: 'Carrera 7 #32-20'
      }
    ];
  
    ngOnInit(): void {}
  
    seleccionarCliente(cliente: Cliente): void {
      console.log('Cliente seleccionado:', cliente);
    }
  
    editarCliente(cliente: Cliente): void {
      console.log('Editar cliente:', cliente);
    }
  
    eliminarCliente(id: number): void {
      this.clientes = this.clientes.filter(c => c.id !== id);
      console.log('Cliente eliminado con ID:', id);
    }
  }