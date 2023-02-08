import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AdminModule } from './modules/admin/admin.module'


const routes: Routes = [
	{ path: '', redirectTo: '/frontend/dashboard/home', pathMatch: 'full' },

	{path:'admin', loadChildren:()=>import('./admin/admin.module').then(mod=>mod.AdminModule)},
	{path:'frontend', loadChildren:()=>import('./frontend/frontend.module').then(mod=>mod.FrontendModule)}

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
 