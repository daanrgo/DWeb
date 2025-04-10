// src/app/pages/cliente/cliente-table/cliente-table.component.ts

import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['./cliente-table.component.css']
})
export class ClienteTableComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente | null = null;
  modoEdicion: boolean = false;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  nuevoCliente(): void {
    this.clienteSeleccionado = new Cliente(0, '', '', '', '', '', 0, '');
    this.modoEdicion = true;
  }

  editar(cliente: Cliente): void {
    this.clienteSeleccionado = { ...cliente };
    this.modoEdicion = true;
  }

  eliminarCliente(id: number): void {
    this.clienteService.deleteCliente(id).subscribe(() => {
      this.cargarClientes();
    });
  }

  guardar(cliente: Cliente): void {
    if (cliente.id) {
      this.clienteService.updateCliente(cliente).subscribe(() => this.cargarClientes());
    } else {
      this.clienteService.addCliente(cliente).subscribe(() => this.cargarClientes());
    }
    this.cancelar();
  }

  cancelar(): void {
    this.modoEdicion = false;
    this.clienteSeleccionado = null;
  }
}


