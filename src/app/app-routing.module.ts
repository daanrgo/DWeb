// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ComidaTableComponent } from './pages/comidas/comidas-table/comidas-table.component';
import { AdicionalTableComponent } from './pages/adicional/adicional-table/adicional-table.component';



const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'comidas', component: ComidaTableComponent },
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: '**', redirectTo: 'landing' },
  { path: 'adicionales', component: AdicionalTableComponent },
  { path: '', redirectTo: '/adicionales', pathMatch: 'full' }, // opcional
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
