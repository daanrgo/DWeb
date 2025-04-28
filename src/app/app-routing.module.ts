// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ComidasTableComponent } from './pages/comidas/comidas-table/comidas-table.component';
import { OrderTableComponent } from './pages/order/order-table/order-table.component';
import { ComidasFormComponent } from './pages/comidas/comidas-form/comidas-form.component';
import { CarritoComponent } from './pages/order/carrito/carrito.component';
import { AdicionalTableComponent } from './pages/adicional/adicional-table/adicional-table.component';
import { AdicionalFormComponent } from './pages/adicional/adicional-form/adicional-form.component';
import { ClienteTableComponent } from './pages/cliente/cliente-table/cliente-table.component';
import { ClienteFormComponent } from './pages/cliente/cliente-form/cliente-form.component';
import { LoginComponent } from './pages/login/login.component';
import { ComidasMenuComponent } from './pages/comidas/comidas-menu/comidas-menu.component';
import { ComidaDetailComponent } from './pages/comidas/comidas-detail/comidas-detail.component';
import { CourierTableComponent } from './pages/courier/courier-table/courier-table.component';
import { CourierFormComponent } from './pages/courier/courier-form/courier-form.component';
import { OperatorTableComponent } from './pages/operator/operator-table/operator-table.component';
import { OperatorFormComponent } from './pages/operator/operator-form/operator-form.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },

  // Login
  { path: 'login', component: LoginComponent },

  //Orders

  { path: 'orders', component: OrderTableComponent},


    // Carrito (usuario autenticado)
  { path: 'comidas/:userId/carrito', component: CarritoComponent, canActivate: [AuthGuard] },

  // CRUD Comidas (admin)
  { path: 'comidas', component: ComidasTableComponent },
  { path: 'comidas/crear', component: ComidasFormComponent },
  { path: 'comidas/editar/:id', component: ComidasFormComponent },

  // Cliente: vista menú y detalle
  { path: 'comidas/:userId/tarjetas', component: ComidasMenuComponent },
  { path: 'comidas/:userId/:id', component: ComidaDetailComponent },


  // Adicionales
  { path: 'adicionales', component: AdicionalTableComponent },
  { path: 'adicionales/crear', component: AdicionalFormComponent },
  { path: 'adicionales/editar/:id', component: AdicionalFormComponent },

  // Clientes
  { path: 'clientes', component: ClienteTableComponent },
  { path: 'clientes/crear', component: ClienteFormComponent },
  { path: 'clientes/editar/:id', component: ClienteFormComponent },

  // Courier
{ path: 'couriers', component: CourierTableComponent },
{ path: 'couriers/crear', component: CourierFormComponent },
{ path: 'couriers/editar/:id', component: CourierFormComponent },

// Operator
{ path: 'operators', component: OperatorTableComponent },
{ path: 'operators/crear', component: OperatorFormComponent },
{ path: 'operators/editar/:id', component: OperatorFormComponent },


  // Fallback
  { path: '**', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
