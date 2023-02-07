import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';

export interface Authdata {
	result: any;
	email: string;
	password: string;
	idToken: string;
    expiresIn: "3600";
    localId: string;

}


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	user = new BehaviorSubject<User>(null)

	constructor(private http: HttpClient, private router: Router) { }

	login(email: string, password: string) {
		return this.http.post<Authdata>(`http://103.127.29.85:3006/api/admin-auth/login`,
			{ email, password }
		) .pipe(tap(resData => {
			console.log(resData);
			
			this.handleAuthentication(
				resData.email,
				resData.localId,
				resData.idToken,
				+resData.expiresIn)
				console.log(resData.email);
				console.log(resData.localId);
				console.log(resData.idToken);
				console.log(resData.expiresIn);
		})
		
	);
	}


	private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token,expirationDate );
		console.log(user);
		
        this.user.next(user);
        // this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }

	getAuth() {
		if (localStorage.getItem('token')) {
			return true;
		} else {
			return false
		}
	}

	logout(){
		localStorage.removeItem('token');
		localStorage.removeItem('userData');
		this.router.navigate(['auth']);

	}
}
