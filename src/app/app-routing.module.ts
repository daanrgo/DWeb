// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ComidasTableComponent } from './pages/comidas/comidas-table/comidas-table.component';
import { ComidasFormComponent } from './pages/comidas/comidas-form/comidas-form.component'; 
import { CarritoComponent } from './pages/order/carrito/carrito.component';
import { AdicionalTableComponent } from './pages/adicional/adicional-table/adicional-table.component';
import { AdicionalFormComponent } from './pages/adicional/adicional-form/adicional-form.component';
import { ClienteTableComponent } from './pages/cliente/cliente-table/cliente-table.component';
import { ClienteFormComponent } from './pages/cliente/cliente-form/cliente-form.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },

  // Login
  { path: 'login', component: LoginComponent },

  // Comidas
  { path: 'comidas', component: ComidasTableComponent },
  { path: 'comidas/crear', component: ComidasFormComponent },
  { path: 'comidas/editar/:id', component: ComidasFormComponent },

  // Ver tarjetas como cliente
  { path: 'comidas/:id/tarjetas', component: ComidasTableComponent, canActivate: [AuthGuard] },

  // Adicionales
  { path: 'adicionales', component: AdicionalTableComponent },
  { path: 'adicionales/crear', component: AdicionalFormComponent },
  { path: 'adicionales/editar/:id', component: AdicionalFormComponent },

  // Carrito protegido
  { path: 'comidas/:id/carrito', component: CarritoComponent, canActivate: [AuthGuard] },

  // Clientes
  { path: 'clientes', component: ClienteTableComponent },
  { path: 'clientes/crear', component: ClienteFormComponent },
  { path: 'clientes/editar/:id', component: ClienteFormComponent },

  // Catch all
  { path: '**', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
