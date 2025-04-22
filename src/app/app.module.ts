import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Landing
import { LandingComponent } from './pages/landing/landing.component';

// Comidas
import { ComidasFormComponent } from './pages/comidas/comidas-form/comidas-form.component';
import { ComidasTableComponent } from './pages/comidas/comidas-table/comidas-table.component';
import { ComidaDetailComponent } from './pages/comidas/comidas-detail/comidas-detail.component';

// Adicionales
import { AdicionalTableComponent } from './pages/adicional/adicional-table/adicional-table.component';
import { AdicionalDetailComponent } from './pages/adicional/adicional-detail/adicional-detail.component';
import { AdicionalFormComponent } from './pages/adicional/adicional-form/adicional-form.component';

// Clientes
import { ClienteTableComponent } from './pages/cliente/cliente-table/cliente-table.component';
import { ClienteFormComponent } from './pages/cliente/cliente-form/cliente-form.component';
import { ClienteDetailComponent } from './pages/cliente/cliente-detail/cliente-detail.component';

// Otros módulos
import { AdminTableComponent } from './pages/admin/admin-table/admin-table.component';
import { BillTableComponent } from './pages/bill/bill-table/bill-table.component';
import { CourierTableComponent } from './pages/courier/courier-table/courier-table.component';
import { CourierFormComponent } from './pages/courier/courier-form/courier-form.component';
import { CourierDetailComponent } from './pages/courier/courier-detail/courier-detail.component';
import { OperatorTableComponent } from './pages/operator/operator-table/operator-table.component';
import { OperatorFormComponent } from './pages/operator/operator-form/operator-form.component';
import { OperatorDetailComponent } from './pages/operator/operator-detail/operator-detail.component';
import { OrderTableComponent } from './pages/order/order-table/order-table.component';
import { OrderFormComponent } from './pages/order/order-form/order-form.component';
import { OrderDetailComponent } from './pages/order/order-detail/order-detail.component';
import { PaymentTypeTableComponent } from './pages/paymentType/payment-type-table/payment-type-table.component';
import { BillDetailComponent } from './pages/bill/bill-detail/bill-detail.component';
import { BillFormComponent } from './pages/bill/bill-form/bill-form.component';
import { PaymentTypeFormComponent } from './pages/paymentType/payment-type-form/payment-type-form.component';
import { PaymentTypeDetailComponent } from './pages/paymentType/payment-type-detail/payment-type-detail.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { CarritoComponent } from './pages/order/carrito/carrito.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    
    // Comidas
    ComidasFormComponent,
    ComidasTableComponent,
    ComidaDetailComponent,
    
    // Adicionales
    AdicionalTableComponent,
    AdicionalDetailComponent,
    AdicionalFormComponent,
    
    // Clientes
    ClienteTableComponent,
    ClienteFormComponent,
    ClienteDetailComponent,
    
    // Otros componentes
    AdminTableComponent,
    BillTableComponent,
    CourierTableComponent,
    CourierFormComponent,
    CourierDetailComponent,
    OperatorTableComponent,
    OperatorFormComponent,
    OperatorDetailComponent,
    OrderTableComponent,
    OrderFormComponent,
    OrderDetailComponent,
    PaymentTypeTableComponent,
    BillDetailComponent,
    BillFormComponent,
    PaymentTypeFormComponent,
    PaymentTypeDetailComponent,
    FooterComponent,
    HeaderComponent,
    CarritoComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,          // Para template-driven forms (ngModel)
    ReactiveFormsModule,  // Para reactive forms (opcional pero recomendado)
    HttpClientModule,     // Para peticiones HTTP
    AppRoutingModule,      // Rutas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }