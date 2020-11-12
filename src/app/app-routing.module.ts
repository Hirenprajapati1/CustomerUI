import { EditProfileComponent } from './Component/edit-profile/edit-profile.component';
import { MainComponent } from './Component/main/main.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { HeaderComponent } from './Component/Main/header/header.component';
import { RootNavComponent } from './root-nav/root-nav.component';
import { GeneralSettingsComponent } from './Component/general-settings/general-settings.component';
import { RegistrationComponent } from './Component/registration/registration.component';
import { ListOfPaymentComponent } from './Component/Invoice/list-of-payment/list-of-payment.component';
//import { AuthGuard } from './Component/auth.guard';
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
//  {path:'', redirectTo:'Nav',pathMatch :'full'},
  {path:'LoginPath',component:LoginPageComponent},
  {path:'', redirectTo:'DashBoard',pathMatch :'full'},
 // {path:'**', redirectTo:'DashBoard',pathMatch :'full'},
 
  {path:'Registration',component:RegistrationComponent},
 // {path:'Nav',component:MainComponent,
 // {path:'Nav',component:HeaderComponent,
 // {path:'Nav',component:RootNavComponent,
  {path:'Nav',component:RootNavComponent},
  
  //children: [
 // {path:'', redirectTo:'DashBoard',pathMatch :'full'},
  {path:'DashBoard',component:DashboardComponent},
  {path:'EditProfile',component:EditProfileComponent},
  
  {path:'ListReport',component:ListReportComponent},
 
  {path:'ListCustomer',component:ListCustomerComponent},
  {path:'AddCustomer',component:AddCustomerComponent},
  {path:'UpdateCustomer/:id',component:UpdateCustomerComponent},
 
  {path:'ListInvoice',component:ListInvoiceComponent},
  {path:'ListPay/:id',component:ListOfPaymentComponent},
  {path:'AddInvoice',component:AddInvoiceComponent},
  {path:'UpdateInvoice/:id',component:UpdateInvoiceComponent},
 
  {path:'ListPayment',component:ListPaymentComponent},
  {path:'AddPayment',component:AddPaymentComponent},
  {path:'UpdatePayment/:id',component:UpdatePaymentComponent},

  {path:'GeneralSettings',component:GeneralSettingsComponent},
//]}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
