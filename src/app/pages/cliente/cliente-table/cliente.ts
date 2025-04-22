// src/app/pages/cliente/cliente.ts

export class Cliente {
  id: number;
  username: string;
  password: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;

  constructor(
    id: number,
    username: string,
    password: string,
    name: string,
    lastName: string,
    email: string,
    phone: string,
    address: string
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}
