// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Landing page
import { LandingComponent } from './pages/landing/landing.component';

// Comidas
import { ComidaTableComponent } from './pages/comidas/comidas-table/comidas-table.component';
import { ComidaDetailComponent } from './pages/comidas/comidas-detail/comidas-detail.component';

// Adicionales
import { AdicionalTableComponent } from './pages/adicional/adicional-table/adicional-table.component';
import { AdicionalDetailComponent } from './pages/adicional/adicional-detail/adicional-detail.component';

// Otros componentes
import { AdminTableComponent } from './pages/admin/admin-table/admin-table.component';
import { BillTableComponent } from './pages/bill/bill-table/bill-table.component';
import { CourierTableComponent } from './pages/courier/courier-table/courier-table.component';
import { OperatorTableComponent } from './pages/operator/operator-table/operator-table.component';
import { ClienteTableComponent } from './pages/cliente/cliente-table/cliente-table.component';
import { OrderTableComponent } from './pages/order/order-table/order-table.component';
import { PaymentTypeTableComponent } from './pages/paymentType/payment-type-table/payment-type-table.component';
import { AdicionalFormComponent } from './pages/adicional/adicional-form/adicional-form.component';
import { ClienteFormComponent } from './pages/cliente/cliente-form/cliente-form.component';
import { ClienteDetailComponent } from './pages/cliente/cliente-detail/cliente-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    ComidaTableComponent,
    ComidaDetailComponent,
    AdicionalTableComponent,
    AdicionalDetailComponent,
    AdminTableComponent,
    BillTableComponent,
    CourierTableComponent,
    OperatorTableComponent,
    ClienteTableComponent,
    OrderTableComponent,
    PaymentTypeTableComponent,
    AdicionalFormComponent,
    ClienteFormComponent,
    ClienteDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
