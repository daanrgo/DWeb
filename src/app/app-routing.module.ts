// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ComidaTableComponent } from './pages/comidas/comidas-table/comidas-table.component';
import { AdicionalTableComponent } from './pages/adicional/adicional-table/adicional-table.component';
import { ClienteTableComponent } from './pages/cliente/cliente-table/cliente-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'comidas', component: ComidaTableComponent },
  { path: 'adicionales', component: AdicionalTableComponent },
  { path: 'clientes', component: ClienteTableComponent },
  { path: '**', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // ✅ definido correctamente
  exports: [RouterModule]
})
export class AppRoutingModule {}