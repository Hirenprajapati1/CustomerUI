import { MainComponent } from './Component/main/main.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { HeaderComponent } from './Component/Main/header/header.component';
import { RootNavComponent } from './root-nav/root-nav.component';
import { GeneralSettingsComponent } from './Component/general-settings/general-settings.component';
import { RegistrationComponent } from './Component/registration/registration.component';
import { ListOfPaymentComponent } from './Component/Invoice/list-of-payment/list-of-payment.component';
import { AuthGuard } from './Component/auth.guard';
import { LoginPageComponent } from './Component/login-page/login-page.component';
import { UpdatePaymentComponent } from './Component/Payment/update-payment/update-payment.component';
import { AddPaymentComponent } from './Component/Payment/add-payment/add-payment.component';
import { UpdateInvoiceComponent } from './Component/Invoice/update-invoice/update-invoice.component';
import { AddInvoiceComponent } from './Component/Invoice/add-invoice/add-invoice.component';
import { AddCustomerComponent } from './Component/Customer/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './Component/Customer/update-customer/update-customer.component';
import { ListPaymentComponent } from './Component/Payment/list-payment/list-payment.component';
import { ListInvoiceComponent } from './Component/Invoice/list-invoice/list-invoice.component';
import { ListReportComponent } from './Component/Report/list-report/list-report.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCustomerComponent } from './Component/Customer/list-customer/list-customer.component';


const routes: Routes = [
  {path:'', redirectTo:'Nav',pathMatch :'full'},
  {path:'LoginPath',component:LoginPageComponent},
  
  {path:'Registration',component:RegistrationComponent},
 // {path:'Nav',component:MainComponent,
 // {path:'Nav',component:HeaderComponent,
  {path:'Nav',component:RootNavComponent,
  children: [

  {path:'', redirectTo:'DashBoard',pathMatch :'full'},
  {path:'DashBoard',component:DashboardComponent,canActivate:[AuthGuard]},
  
  {path:'ListReport',component:ListReportComponent,canActivate:[AuthGuard]},
 
  {path:'ListCustomer',component:ListCustomerComponent,canActivate:[AuthGuard]},
  {path:'AddCustomer',component:AddCustomerComponent,canActivate:[AuthGuard]},
  {path:'UpdateCustomer/:id',component:UpdateCustomerComponent,canActivate:[AuthGuard]},
 
  {path:'ListInvoice',component:ListInvoiceComponent,canActivate:[AuthGuard]},
  {path:'ListPay/:id',component:ListOfPaymentComponent,canActivate:[AuthGuard]},
  {path:'AddInvoice',component:AddInvoiceComponent,canActivate:[AuthGuard]},
  {path:'UpdateInvoice/:id',component:UpdateInvoiceComponent,canActivate:[AuthGuard]},
 
  {path:'ListPayment',component:ListPaymentComponent,canActivate:[AuthGuard]},
  {path:'AddPayment',component:AddPaymentComponent,canActivate:[AuthGuard]},
  {path:'UpdatePayment/:id',component:UpdatePaymentComponent,canActivate:[AuthGuard]},

  {path:'GeneralSettings',component:GeneralSettingsComponent,canActivate:[AuthGuard]},
]}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
