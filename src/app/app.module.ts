import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ForgetPasswordComponent } from './components/auth/forget-password/forget-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { MainDashboardComponent } from './components/dashboard/main-dashboard/main-dashboard.component';
import { ProductComponent } from './components/dashboard/product/product.component';
import { CategoryComponent } from './components/dashboard/category/category.component';
import { AtributesComponent } from './components/dashboard/atributes/atributes.component';
import { BrandComponent } from './components/dashboard/brand/brand.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ForgetPasswordComponent,
    DashboardComponent,
    SidebarComponent,
    MainDashboardComponent,
    ProductComponent,
    CategoryComponent,
    AtributesComponent,
    BrandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
