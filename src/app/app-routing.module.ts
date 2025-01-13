import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { EmailComponent } from './component/email/email.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HomeComponent } from './component/home/home.component';
import { ProductsComponent } from './component/products/products.component';
import { OrdersComponent } from './component/orders/orders.component';
import { UsersComponent } from './component/users/users.component';
import { VouchersComponent } from './component/vouchers/vouchers.component';
import { AnalyticsComponent } from './component/analytics/analytics.component';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { SettingsComponent } from './component/settings/settings.component';
import { AddProductsComponent } from './component/add-products/add-products.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';
import { AddUsersComponent } from './component/add-users/add-users.component';
import { EditUsersComponent } from './component/edit-users/edit-users.component';
import { AddVouchersComponent } from './component/add-vouchers/add-vouchers.component';
import { EditVouchersComponent } from './component/edit-vouchers/edit-vouchers.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DetailProductComponent } from './component/detail-product/detail-product.component';
import { CategoryComponent } from './component/category/category.component';
import { DetailOrdersComponent } from './component/detail-orders/detail-orders.component';
import { EditOrdersComponent } from './component/edit-orders/edit-orders.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { VerifyCodeComponent } from './component/verify-code/verify-code.component';
import { ResendVerificationCodeComponent } from './component/resend-verification-code/resend-verification-code.component';
import { CartComponent } from './component/cart/cart.component';
import { UserHomeComponent } from './user-home/user-home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'email', component: EmailComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'app-add-products', component: AddProductsComponent },
  { path: 'product/:id', component: DetailProductComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'app-users', component: UsersComponent },
  { path: 'app-add-users', component: AddUsersComponent },
  { path: 'edit-users/:id', component: EditUsersComponent },
  { path: 'vouchers', component: VouchersComponent },
  { path: 'app-add-vouchers', component: AddVouchersComponent },
  { path: 'edit-vouchers', component: EditVouchersComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'orders/:id', component: DetailOrdersComponent },
  { path: 'edit-orders/:id', component: EditOrdersComponent },
  {path : 'verify-code',component: VerifyCodeComponent},
  {path: 'resend-verification-code',component: ResendVerificationCodeComponent},
  {path: 'app-user-home', component: UserHomeComponent},
  {path: 'cart',component:CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
