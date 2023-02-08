import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap, TimeoutError } from 'rxjs';
import { User } from '../models/user.model';

export interface Authdata {
	error: any;
	result: any;
	email: string;
	password: string;
	id: string;
	token: string;
    expiresIn: string;

}


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	user = new BehaviorSubject<User>(null)
	tokenExpirationTimer: any;

	constructor(private http: HttpClient, private router: Router) { }	

	login(email: string, password: string) {
		return this.http.post<Authdata>(`http://103.127.29.85:3006/api/admin-auth/login`,
			{ email, password }
		).pipe(tap(resData => {

			this.handleAuthentication(
				resData.result.user.email,
				resData.result.user.id,
				resData.result.token,
				+resData.expiresIn
			);
		})
		);
	}

	autoLogin() {
        let loggedinUser: any = localStorage.getItem('userData');

        const userData: {
            email: string;
            id: string;
            _token: string;
			_tokenExpirationDate:string;
        } = JSON.parse(loggedinUser);
        
		// console.log(userData);
		
        if (!userData) {
            return;
        }
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
			new Date(userData._tokenExpirationDate)
        );

		if(loadedUser.token){
			this.user.next(loadedUser);

			const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
			this.autoLogout(expirationDuration);
		}

    }

	logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('userData');
		this.router.navigate(['auth']);

		//for autoLogout
		if(this.tokenExpirationTimer){
			clearTimeout(this.tokenExpirationTimer);
		}
		this.tokenExpirationTimer = null;

	}

	autoLogout(expirationDuration:number){
		this.tokenExpirationTimer = setTimeout(() => {
			this.logout();
		}, expirationDuration);
	}


	private handleAuthentication(email: string, userId: string, token: string,expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

		const user = new User(
			email,
			userId,
			token,
			expirationDate
		);
		this.user.next(user); //storing data in user subject

		this.autoLogout(3600*1000)
		localStorage.setItem('userData', JSON.stringify(user));

	}


	// private handleAuthentication(email: string, userId: string, token: string) {
	// 	console.log(email);

	// 	const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
	// 	const user = new User(email, userId, token, expirationDate);
	// 	console.log(user);

	// 	this.user.next(user);
	// 	// this.autoLogout(expiresIn * 1000);
	// 	localStorage.setItem('userData', JSON.stringify(user));
	// }

	getAuth() {
		if (localStorage.getItem('token')) {
			return true;
		} else {
			return false
		}
	}

	
}
