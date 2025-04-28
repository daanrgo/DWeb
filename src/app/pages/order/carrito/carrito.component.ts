// src/app/pages/order/carrito/carrito.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private comidaService: ComidasService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userIdParam = params.get('userId');
      if (userIdParam) {
        this.userId = +userIdParam;
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
      this.comidas = [];
      this.costoTotal = 0;
    }
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
    if (this.comidas.length === 0) {
      Swal.fire('Carrito vacío', 'Agrega productos antes de hacer tu pedido.', 'warning');
      return;
    }

    const comidasDTO = this.comidas.map(c => ({
      id: c.id,
      name: c.name,
      price: c.price,
      description: c.description,
      imagen: c.imagen,
      quantity: c.quantity ?? 1
    }));

    const dto: DTOIdUsuarioComidas = {
      user_id: this.userId,
      comidas: comidasDTO
    };

    this.orderService.sendOrder(dto).subscribe({
      next: () => {
        this.vaciarCarritoSinConfirmacion();
        Swal.fire({
          title: 'Pedido enviado',
          text: 'Tu pedido ha sido realizado con éxito.',
          icon: 'success',
          confirmButtonColor: '#A0522D',
          timer: 2000,
          showConfirmButton: false
        });
        this.router.navigate(['/orders']);
      },
      error: (err: any) => {
        console.error('Error al enviar pedido:', err);
        Swal.fire('Error', 'No se pudo enviar el pedido.', 'error');
      }
    });
  }

  vaciarCarrito(): void {
    if (this.comidas.length === 0) {
      Swal.fire('Carrito ya vacío', 'No tienes productos en el carrito.', 'info');
      return;
    }

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

  explorarProductos(): void {
    this.router.navigate([`/comidas/${this.userId}/tarjetas`]);
  }
}
