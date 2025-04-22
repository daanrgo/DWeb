// src/app/pages/order/carrito/carrito.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComidasService } from 'src/app/services/comidas.service';
import { OrderService } from 'src/app/services/order.service';
import { DTOIdUsuarioComidas, Comida } from 'src/app/pages/comidas/comidas-table/comida';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  userId: number = 1;
  comidas: Comida[] = [];
  costoTotal: number = 0;

  constructor(
    private route: ActivatedRoute,
    private comidaService: ComidasService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.userId = +idParam;
        this.cargarCarritoDesdeLocalStorage();
      }
    });
  }

  cargarCarritoDesdeLocalStorage(): void {
    const guardado = localStorage.getItem('carrito');
    if (guardado) {
      this.comidas = JSON.parse(guardado);
      this.calcularCostoTotal();
    } else {
      this.loadComidas();
    }
  }

  loadComidas(): void {
    this.comidaService.getAllComidas(this.userId).subscribe({
      next: (comidas) => {
        this.comidas = comidas.map(c => ({
          ...c,
          imagen: this.formatImagen(c.imagen)
        }));
        this.calcularCostoTotal();
        this.guardarCarritoEnLocalStorage();
      },
      error: (err) => console.error('Error cargando comidas:', err)
    });
  }

  calcularSubtotal(comida: Comida): number {
    const adicionalesCost = comida.adicionales
      ?.filter(a => comida.adicionalesSeleccionados?.[a.id])
      .reduce((sum, a) => sum + a.price, 0) || 0;

    return (comida.price + adicionalesCost) * (comida.quantity ?? 1);
  }

  calcularCostoTotal(): void {
    this.costoTotal = this.comidas.reduce((total, comida) => {
      const adicionalesCost = comida.adicionales
        ?.filter(a => comida.adicionalesSeleccionados?.[a.id])
        .reduce((sum, a) => sum + a.price, 0) || 0;

      return total + (comida.price + adicionalesCost) * (comida.quantity ?? 1);
    }, 0);
  }

  hacerPedido(): void {
    const comidasDTO = this.comidas.map(c => ({
      id: c.id,
      name: c.name,
      price: c.price,
      description: c.description,
      imagen: c.imagen,
      adicionales: c.adicionales,
      adicionalesSeleccionados: c.adicionalesSeleccionados,
      quantity: c.quantity ?? 1
    }));

    const dto: DTOIdUsuarioComidas = {
      user_id: this.userId,
      comidas: comidasDTO
    };

    this.orderService.enviarPedido(dto).subscribe({
      next: () => {
        Swal.fire('Pedido enviado', 'Tu pedido ha sido realizado con éxito.', 'success');
        this.vaciarCarritoSinConfirmacion();
      },
      error: (err) => console.error('Error al enviar pedido:', err)
    });
  }

  vaciarCarrito(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminarán todos los productos del carrito.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#A0522D',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.vaciarCarritoSinConfirmacion();
        Swal.fire('Carrito vacío', 'Tu carrito ha sido vaciado.', 'success');
      }
    });
  }

  vaciarCarritoSinConfirmacion(): void {
    this.comidas = [];
    localStorage.removeItem('carrito');
    this.costoTotal = 0;
  }

  eliminarComida(index: number): void {
    this.comidas.splice(index, 1);
    this.guardarCarritoEnLocalStorage();
    this.calcularCostoTotal();
  }

  actualizarCantidad(): void {
    this.guardarCarritoEnLocalStorage();
    this.calcularCostoTotal();
  }

  guardarCarritoEnLocalStorage(): void {
    localStorage.setItem('carrito', JSON.stringify(this.comidas));
  }

  obtenerNombresAdicionales(comida: Comida): string {
    if (!comida.adicionales || !comida.adicionalesSeleccionados) return 'Ninguno';
    const seleccionados = comida.adicionales
      .filter(a => comida.adicionalesSeleccionados?.[a.id])
      .map(a => a.name);
    return seleccionados.length > 0 ? seleccionados.join(', ') : 'Ninguno';
  }

  private formatImagen(imagen: string): string {
    const fileName = imagen.replace(/^.*[\\\/]/, '').replace(/^images[\\\/]/, '');
    return `assets/images/${fileName}`;
  }

  Math = Math;

}
