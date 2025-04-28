// order.ts - Versión mejorada
export interface Order {
  id: number;
  quantity: number;
  comida?: {  // Hacerlo opcional si no siempre viene
    id: number;
    name: string;
    price: number;
  };
  bill?: {    // Hacerlo opcional
    id: number;
    client?: {
      id: number;
      name: string;
    };
    address?: string;
  };
  courier?: {
    id: number;
    name: string;
  };
  status: number;
  cliente?: {  // Mantener compatibilidad
    nombre: string;
  };
}