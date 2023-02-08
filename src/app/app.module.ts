import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './modules/admin/components/auth/auth.component';
import { ForgetPasswordComponent } from './modules/admin/components/auth/forget-password/forget-password.component';
import { DashboardComponent } from './modules/admin/components/dashboard/dashboard.component';
import { SidebarComponent } from './modules/admin/components/common/sidebar/sidebar.component';
import { HeaderComponent } from './modules/admin/components/common/sidebar/header/header.component';
import { MainDashboardComponent } from './modules/admin/components/dashboard/main-dashboard/main-dashboard.component';
import { ProductComponent } from './modules/admin/components/dashboard/product/product.component';
import { CategoryComponent } from './modules/admin/components/dashboard/category/category.component';
import { AtributesComponent } from './modules/admin/components/dashboard/atributes/atributes.component';
import { BrandComponent } from './modules/admin/components/dashboard/brand/brand.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ForgetPasswordComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    MainDashboardComponent,
    ProductComponent,
    CategoryComponent,
    AtributesComponent,
    BrandComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
