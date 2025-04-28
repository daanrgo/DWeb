// File: comidas-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComidasService } from 'src/app/services/comidas.service';
import { Comida } from '../comidas-table/comida';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comida-detail',
  templateUrl: './comidas-detail.component.html',
  styleUrls: ['./comidas-detail.component.css']
})
export class ComidaDetailComponent implements OnInit {
  comida: Comida = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    imagen: '',
    adicionales: [],
    adicionalesSeleccionados: {},
    quantity: 1
  };

  isEditing: boolean = false;
  modoLectura: boolean = true;
  userId: number = 1;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private comidasService: ComidasService
  ) {}

  ngOnInit(): void {
    this.loadComidaData();
  }

  private loadComidaData(): void {
    const userIdParam = this.route.snapshot.paramMap.get('userId');
    const comidaIdParam = this.route.snapshot.paramMap.get('id');

    // Validar parámetros de la ruta
    if (!userIdParam || !comidaIdParam) {
      this.handleInvalidRouteParameters();
      return;
    }

    this.userId = Number(userIdParam);
    const comidaId = Number(comidaIdParam);

    if (isNaN(this.userId) || isNaN(comidaId)) {
      this.handleInvalidIds();
      return;
    }

    this.fetchComidaData(comidaId);
  }

  private fetchComidaData(comidaId: number): void {
    this.comidasService.getComida(this.userId, comidaId).subscribe({
      next: (data) => {
        if (!data) {
          this.handleComidaNotFound();
          return;
        }

        this.prepareComidaData(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando comida:', err);
        this.handleLoadError();
      }
    });
  }

  private prepareComidaData(data: Comida): void {
    this.comida = {
      ...data,
      imagen: this.formatImagen(data.imagen ?? ''),
      adicionalesSeleccionados: {},
      quantity: 1
    };

    // Inicializar adicionales seleccionados
    if (this.comida.adicionales) {
      this.comida.adicionales.forEach(ad => {
        if (ad.id) {
          this.comida.adicionalesSeleccionados![ad.id] = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (!this.validateComidaBeforeSubmit()) {
      return;
    }

    const carritoActual = this.getCurrentCart();
    const carritoLimpio = this.cleanCartData(carritoActual);

    // Verificar si la comida ya está en el carrito
    const existingIndex = carritoLimpio.findIndex(item => item.id === this.comida.id);
    
    if (existingIndex >= 0) {
      // Actualizar cantidad si ya existe
      carritoLimpio[existingIndex].quantity = (carritoLimpio[existingIndex].quantity || 1) + 1;
    } else {
      // Agregar nueva comida al carrito
      carritoLimpio.push(this.prepareComidaForCart());
    }

    this.saveCart(carritoLimpio);
    this.showSuccessMessage();
    this.navigateToCart();
  }

  private validateComidaBeforeSubmit(): boolean {
    if (!this.comida.id || !this.comida.name || this.comida.price <= 0) {
      console.error('Datos de comida inválidos:', this.comida);
      Swal.fire('Error', 'La comida no tiene datos válidos', 'error');
      return false;
    }
    return true;
  }

  private getCurrentCart(): any[] {
    try {
      return JSON.parse(localStorage.getItem('carrito') || '[]');
    } catch (e) {
      console.error('Error al parsear carrito:', e);
      return [];
    }
  }

  private cleanCartData(cart: any[]): any[] {
    return cart.filter(item => 
      item.id && item.name && !isNaN(item.price) && item.price > 0
    );
  }

  private prepareComidaForCart(): any {
    return {
      id: this.comida.id,
      name: this.comida.name,
      price: this.comida.price,
      description: this.comida.description,
      imagen: this.comida.imagen,
      adicionales: this.comida.adicionales,
      adicionalesSeleccionados: this.getSelectedExtras(),
      quantity: this.comida.quantity || 1
    };
  }

  private getSelectedExtras(): {[key: number]: boolean} {
    const selected: {[key: number]: boolean} = {};
    if (this.comida.adicionales && this.comida.adicionalesSeleccionados) {
      this.comida.adicionales.forEach(ad => {
        if (ad.id) {
          selected[ad.id] = !!this.comida.adicionalesSeleccionados?.[ad.id];
        }
      });
    }
    return selected;
  }

  private saveCart(cart: any[]): void {
    try {
      localStorage.setItem('carrito', JSON.stringify(cart));
    } catch (e) {
      console.error('Error al guardar en localStorage:', e);
      Swal.fire('Error', 'No se pudo guardar en el carrito', 'error');
    }
  }

  private showSuccessMessage(): void {
    Swal.fire({
      title: '¡Agregado al carrito!',
      text: `${this.comida.name} ha sido agregada al carrito`,
      icon: 'success',
      confirmButtonColor: '#A0522D',
      timer: 1500
    });
  }

  private navigateToCart(): void {
    this.router.navigate([`/comidas/${this.userId}/carrito`]);
  }

  onCancel(): void {
    this.router.navigate([`/comidas/${this.userId}/tarjetas`]);
  }

  trackByAdicional(index: number, adicional: any): number {
    return adicional.id;
  }

  private formatImagen(imagen: string): string {
    const fileName = imagen.replace(/^.*[\\\/]/, '').replace(/^images[\\\/]/, '');
    return `assets/images/${fileName}`;
  }

  // Manejo de errores
  private handleInvalidRouteParameters(): void {
    console.error('Parámetros de ruta inválidos');
    Swal.fire('Error', 'URL inválida', 'error');
    this.router.navigate(['/']);
  }

  private handleInvalidIds(): void {
    console.error('IDs inválidos en la ruta');
    Swal.fire('Error', 'IDs de usuario o comida inválidos', 'error');
    this.router.navigate(['/']);
  }

  private handleComidaNotFound(): void {
    console.error('No se encontró la comida con ese ID');
    Swal.fire('Error', 'Comida no encontrada', 'error');
    this.router.navigate([`/comidas/${this.userId}/tarjetas`]);
  }

  private handleLoadError(): void {
    Swal.fire('Error', 'No se pudo cargar la información de la comida', 'error');
    this.router.navigate([`/comidas/${this.userId}/tarjetas`]);
  }
}