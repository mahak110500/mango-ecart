import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/guards/auth.guard';
import { LoggedinAuthGuard } from 'src/app/guards/loggedin-auth.guard';
import { AuthComponent } from './components/auth/auth.component';
import { ForgetPasswordComponent } from './components/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { AtributesComponent } from './components/dashboard/atributes/atributes.component';
import { BrandComponent } from './components/dashboard/brand/brand.component';
import { CategoryComponent } from './components/dashboard/category/category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainDashboardComponent } from './components/dashboard/main-dashboard/main-dashboard.component';
import { ProductComponent } from './components/dashboard/product/product.component';

const routes: Routes = [
	{ path: '', redirectTo: '/dashboard/main-dashboard', pathMatch: 'full' },

	{
		path: 'auth',
		component: AuthComponent,
		canActivate: [LoggedinAuthGuard]
	},
	{
		path: 'forget-password',
		component: ForgetPasswordComponent,
		canActivate: [LoggedinAuthGuard]
	},
	{
		path: 'reset-password',
		component: ResetPasswordComponent,
		canActivate: [LoggedinAuthGuard]
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
		// canActivate: [AuthGuard],
		children: [
			{
				path: 'product',
				component: ProductComponent,
				canActivate: [AuthGuardGuard]
			},
			{
				path: 'category',
				component: CategoryComponent,
				canActivate: [AuthGuardGuard]
			},
			{
				path: 'attribute',
				component: AtributesComponent,
				canActivate: [AuthGuardGuard]
			},
			{
				path: 'brand',
				component: BrandComponent,
				canActivate: [AuthGuardGuard]
			},
			{
				path: 'main-dashboard',
				component: MainDashboardComponent
			}

		]

	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
