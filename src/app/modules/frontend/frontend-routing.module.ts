import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/dashboard/home/home.component';

const routes: Routes = [
  {
		path: 'dashboard',
		component: DashboardComponent,
		children: [
			{
				path: 'home',
				component: HomeComponent,
			}
		]

	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
