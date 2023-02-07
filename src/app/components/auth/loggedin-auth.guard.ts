import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class LoggedinAuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

			if (this.authService.getAuth()) {
				this.router.navigate(['/dashboard/main-dashboard'])
				return false
			} else {
				return true
			}
			
	}
}



