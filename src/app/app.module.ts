import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as toastr from 'toastr';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { EmailComponent } from './component/email/email.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { ProductsComponent } from './component/products/products.component';
import { OrdersComponent } from './component/orders/orders.component';
import { VouchersComponent } from './component/vouchers/vouchers.component';
import { AnalyticsComponent } from './component/analytics/analytics.component';
import { SettingsComponent } from './component/settings/settings.component';
import { AddProductsComponent } from './component/add-products/add-products.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';
import { AddUsersComponent } from './component/add-users/add-users.component';
import { EditUsersComponent } from './component/edit-users/edit-users.component';
import { AddVouchersComponent } from './component/add-vouchers/add-vouchers.component';
import { EditVouchersComponent } from './component/edit-vouchers/edit-vouchers.component';
import { HomeuserComponent } from './user/homeuser/homeuser.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailProductComponent } from './component/detail-product/detail-product.component';
import { CategoryComponent } from './component/category/category.component';
import { AddCategoryComponent } from './component/add-category/add-category.component';
import { DetailOrdersComponent } from './component/detail-orders/detail-orders.component';
import { EditOrdersComponent } from './component/edit-orders/edit-orders.component';
import { UsersComponent } from './component/users/users.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { NavUserHomeComponent } from './nav-user-home/nav-user-home.component';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { VerifyCodeComponent } from './component/verify-code/verify-code.component';
import { ResendVerificationCodeComponent } from './component/resend-verification-code/resend-verification-code.component';
import { CartComponent } from './component/cart/cart.component';
import { ModalComponent } from './modal/modal.component';
import { OnlinePaymentComponent } from './online-payment/online-payment.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    EmailComponent,
    VerifyEmailComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AppComponent,
    DashboardComponent,
    HomeComponent,
    ProductsComponent,
    OrdersComponent,
    UsersComponent,
    VouchersComponent,
    AnalyticsComponent,
    FeedbackComponent,
    SettingsComponent,
    AddProductsComponent,
    EditProductComponent,
    AddUsersComponent,
    EditUsersComponent,
    AddVouchersComponent,
    EditVouchersComponent,
    HomeuserComponent,
    DetailProductComponent,
    CategoryComponent,
    AddCategoryComponent,
    DetailOrdersComponent,
    EditOrdersComponent,
    UserHomeComponent,
    NavUserHomeComponent,
    VerifyCodeComponent,
    ResendVerificationCodeComponent,
    CartComponent,
    UserHomeComponent,
    ModalComponent,
    OnlinePaymentComponent


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,


  ],
  providers: [],
  bootstrap: [DashboardComponent]
})
export class AppModule { }
