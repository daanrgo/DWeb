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
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },

  { path: 'login', component: LoginComponent },

  { path: 'orders', component: OrderTableComponent, canActivate: [RoleGuard], data: { expectedRole: 'operador' } },

  { path: 'comidas/:userId/carrito', component: CarritoComponent, canActivate: [AuthGuard] },

  { path: 'comidas', component: ComidasTableComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'comidas/crear', component: ComidasFormComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'comidas/editar/:id', component: ComidasFormComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },

  { path: 'comidas/:userId/tarjetas', component: ComidasMenuComponent, canActivate: [RoleGuard], data: { expectedRole: 'cliente' } },
  { path: 'comidas/:userId/:id', component: ComidaDetailComponent },

  { path: 'adicionales', component: AdicionalTableComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'adicionales/crear', component: AdicionalFormComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'adicionales/editar/:id', component: AdicionalFormComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },

  { path: 'clientes', component: ClienteTableComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'clientes/crear', component: ClienteFormComponent },
  { path: 'clientes/editar/:id', component: ClienteFormComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },

  { path: 'couriers', component: CourierTableComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'couriers/crear', component: CourierFormComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'couriers/editar/:id', component: CourierFormComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },

  { path: 'courier/envios', component: CourierTableComponent, canActivate: [RoleGuard], data: { expectedRole: 'courier' } },

  { path: 'operators', component: OperatorTableComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'operators/crear', component: OperatorFormComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },
  { path: 'operators/editar/:id', component: OperatorFormComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },

  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { expectedRole: 'admin' } },

  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
