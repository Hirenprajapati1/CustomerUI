import { ChartsModule } from 'ng2-charts';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListReportComponent } from './Component/Report/list-report/list-report.component';
import { ListCustomerComponent } from './Component/Customer/list-customer/list-customer.component';
import { ListInvoiceComponent } from './Component/Invoice/list-invoice/list-invoice.component';
import { ListPaymentComponent } from './Component/Payment/list-payment/list-payment.component';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { AddCustomerComponent } from './Component/Customer/add-customer/add-customer.component';
import { AddInvoiceComponent } from './Component/Invoice/add-invoice/add-invoice.component';
import { UpdateInvoiceComponent } from './Component/Invoice/update-invoice/update-invoice.component';
import { UpdateCustomerComponent } from './Component/Customer/update-customer/update-customer.component';
import { UpdatePaymentComponent } from './Component/Payment/update-payment/update-payment.component';
import { AddPaymentComponent } from './Component/Payment/add-payment/add-payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './Component/login-page/login-page.component';
import { HeaderComponent } from './Component/Main/header/header.component';
import { RootNavComponent } from './root-nav/root-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ListOfPaymentComponent } from './Component/Invoice/list-of-payment/list-of-payment.component';
import {MatCardModule} from '@angular/material/card';

import { MatInputModule } from '@angular/material/input';
import { RegistrationComponent } from './Component/registration/registration.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GeneralSettingsComponent } from './Component/general-settings/general-settings.component';
import {MatDialogModule} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { MainComponent } from './Component/main/main.component';
import { FooterComponent } from './Component/Main/footer/footer.component';
import { MenuSidebarComponent } from './Component/Main/menu-sidebar/menu-sidebar.component';
import { UserDropdownMenuComponent } from './Component/Main/header/user-dropdown-menu/user-dropdown-menu.component';
import { NotificationsDropdownMenuComponent } from './Component/Main/header/notifications-dropdown-menu/notifications-dropdown-menu.component';
import { MessagesDropdownMenuComponent } from './Component/Main/header/messages-dropdown-menu/messages-dropdown-menu.component';
import { EditProfileComponent } from './Component/edit-profile/edit-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    ListReportComponent,
    ListCustomerComponent,
    ListInvoiceComponent,
    ListPaymentComponent,
    AddCustomerComponent,
    AddInvoiceComponent,
    UpdateInvoiceComponent,
    UpdateCustomerComponent,
    UpdatePaymentComponent,
    AddPaymentComponent,
    LoginPageComponent,
    RootNavComponent,
    ListOfPaymentComponent,
    RegistrationComponent,
    GeneralSettingsComponent,
    DashboardComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    MenuSidebarComponent,
    UserDropdownMenuComponent,
    NotificationsDropdownMenuComponent,
    MessagesDropdownMenuComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  
    MatSelectModule,
    MatToolbarModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(
      {      progressBar: true
      }
    ), LayoutModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, // ToastrModule added
    MatCardModule, 
    MatSlideToggleModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDialogModule, 
    MatRadioModule,
    MatCheckboxModule,
    ChartsModule
    //MatMomentDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
