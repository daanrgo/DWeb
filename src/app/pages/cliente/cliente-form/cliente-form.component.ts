import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente-table/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  // Objeto cliente con valores iniciales
  cliente: Cliente = {
    //id: 0,
    username: '',
    password: '',
    name: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  } as Cliente;

  // Estados del componente
  isSaving = false;       // Indica si se está guardando
  errorMessage = '';      // Mensaje de error para el usuario
  editando = false;       // Modo edición/creación

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkEditMode();
  }

  /**
   * Verifica si estamos en modo edición
   */
  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.loadClient(+id);
    }
  }

  /**
   * Carga los datos de un cliente existente
   * @param id ID del cliente a cargar
   */
  private loadClient(id: number): void {
    this.isSaving = true;
    this.clienteService.getById(id).subscribe({
      next: (data) => {
        this.cliente = data;
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Error cargando cliente:', err);
        this.errorMessage = 'Error al cargar los datos del cliente';
        this.isSaving = false;
      }
    });
  }

  /**
   * Maneja el envío del formulario
   */
  onSubmit(): void {
    // Validación básica
    if (!this.validateForm()) {
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    // Prepara los datos para enviar
    const clienteData = this.prepareData();

    // Decide si es creación o actualización
    const operation = this.editando
      ? this.clienteService.update(clienteData.id, clienteData)
      : this.clienteService.create(clienteData);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/clientes']);
      },
      error: (err) => {
        console.error('Error guardando cliente:', err);
        this.handleError(err);
        this.isSaving = false;
      }
    });
  }

  /**
   * Valida los campos requeridos
   */
  private validateForm(): boolean {
    if (!this.cliente.username || !this.cliente.password) {
      this.errorMessage = 'Usuario y contraseña son requeridos';
      return false;
    }
    return true;
  }

  /**
   * Prepara los datos para enviar al servidor
   */
  private prepareData(): any {
    return {
      ...this.cliente,
      phone: this.cliente.phone.toString() // Asegura que phone sea string
    };
  }

  /**
   * Maneja errores de la API
   * @param err Objeto de error
   */
  private handleError(err: any): void {
    if (err.status === 400) {
      this.errorMessage = 'Datos inválidos. Verifica los campos.';
    } else if (err.status === 500) {
      this.errorMessage = 'Error en el servidor. Intenta nuevamente.';
    } else {
      this.errorMessage = 'Error desconocido. Contacta al administrador.';
    }
  }
}