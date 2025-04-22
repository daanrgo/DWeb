export interface Adicional {
  id: number;
  name: string;
  price: number;
}

export interface Comida {
  id: number;
  name: string;
  price: number;
  description: string;
  imagen: string;
  adicionales?: Adicional[];
  adicionalesSeleccionados?: { [key: number]: boolean };
  quantity? :number;
}

// Interface para la respuesta del endpoint /comidas/{user_id}
export interface DTOIdUsuarioComidas {
  user_id: number;
  comidas: Comida[];
}

// Interface para la respuesta del endpoint /comidas/{user_id}/{id}
export interface DTOIdUsuarioComida {
  user_id: number;
  comida: Comida;
}