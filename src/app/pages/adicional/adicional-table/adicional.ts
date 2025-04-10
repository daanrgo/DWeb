// src/app/pages/adicional/adicional.ts

export class Adicional {
  id: number;
  name: string;
  price: number;

  constructor(id: number = 0, name: string = '', price: number = 0) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
