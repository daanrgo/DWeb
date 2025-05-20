export interface Adicional {
  id: number;
  name: string;
  price: number;
}

export interface Comida {
  id: number;
  name: string;
  price: number;
  description?: string;
  imagen?: string;
  adicionales?: Adicional[];
  adicionalesSeleccionados?: { [key: number]: boolean };
}

export interface OrderEntity {
  id: number;
  quantity: number;
  comida: Comida;
}

export interface Client {
  id: number;
  username: string;
  name?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface Bill {
  id: number;
  status: number;
  creationDate: Date;
  address: string;
  operator?: any;
  client?: Client;
  courier?: any;
  paymentType?: any;
  orders: OrderEntity[];
}