// src/app/pages/admin/admin-table/admin-table.component.ts

import { Component, OnInit } from '@angular/core';

export class Admin {
  id: number;
  name: string;
  username: string;
  password: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.username = '';
    this.password = '';
  }
}

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit {
  admins: Admin[] = [
    {
      id: 1,
      name: 'Administrador Uno',
      username: 'admin1',
      password: '1234'
    },
    {
      id: 2,
      name: 'Administrador Dos',
      username: 'admin2',
      password: '5678'
    }
  ];

  ngOnInit(): void {}

  seleccionarAdmin(admin: Admin): void {
    console.log('Admin seleccionado:', admin);
  }

  editarAdmin(admin: Admin): void {
    console.log('Editar admin:', admin);
  }

  eliminarAdmin(id: number): void {
    this.admins = this.admins.filter(a => a.id !== id);
    console.log('Admin eliminado con ID:', id);
  }
}
