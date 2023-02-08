import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './admin/components/auth/auth.component';
import { ForgetPasswordComponent } from './admin/components/auth/forget-password/forget-password.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { SidebarComponent } from './admin/components/common/sidebar/sidebar.component';
import { HeaderComponent } from './admin/components/common/sidebar/header/header.component';
import { MainDashboardComponent } from './admin/components/dashboard/main-dashboard/main-dashboard.component';
import { ProductComponent } from './admin/components/dashboard/product/product.component';
import { CategoryComponent } from './admin/components/dashboard/category/category.component';
import { AtributesComponent } from './admin/components/dashboard/atributes/atributes.component';
import { BrandComponent } from './admin/components/dashboard/brand/brand.component';

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
