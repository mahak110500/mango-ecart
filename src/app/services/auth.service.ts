import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';

export interface Authdata {
	error: any;
	result: any;
	email: string;
	password: string;
	id: string;
	token: string;
    expiresIn: string;
	rememberMe :boolean;

}


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	user = new BehaviorSubject<User>(null)
	tokenExpirationTimer: any;

	constructor(private http: HttpClient, private router: Router) { }	

	login(email: string, password: string, rememberMe:boolean) {
		console.log(rememberMe);
		if(rememberMe){
			this.autoLogin();
			
		}
		
		return this.http.post<Authdata>(`http://103.127.29.85:3006/api/admin-auth/login`,
			{ email, password }
		).pipe(tap(resData => {
			console.log(resData);
			

			this.handleAuthentication(
				resData.result.user.email,
				resData.result.user.id,
				resData.result.token,
				+resData.expiresIn,
				resData.rememberMe
			);
		})
		);
	}

	autoLogin() {
        let loggedinUser: any = localStorage.getItem('userData');

        const userData: {
			rememberMe: boolean;
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
            userData.rememberMe,
            userData._token,
			new Date(userData._tokenExpirationDate)
        );

		if(loadedUser.token){
			this.user.next(loadedUser);

			const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

			if(this.tokenExpirationTimer > 0){

				this.autoLogout(expirationDuration);
			}
		}

    }

	logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('userData');
		localStorage.removeItem('rememberMe');
		this.router.navigate(['/admin/auth']);


		//for autoLogout
		if(this.tokenExpirationTimer){
			clearTimeout(this.tokenExpirationTimer);
		}
		this.tokenExpirationTimer = null;

	}

	autoLogout(expirationDuration:number){

		const accessTokenObj = localStorage.getItem("token");
		const rememberMe = localStorage.getItem('rememberMe');

		if (accessTokenObj && rememberMe == 'yes'){
			 this.router.navigate(['/admin/dashboard/main-dashboard']);

		} else{
			this.tokenExpirationTimer = setTimeout(() => {
				this.logout();
			}, 3000);
		}
		
	}


	private handleAuthentication(email: string, userId: string, token: string,expiresIn: number, rememberMe:boolean) {
		console.log(rememberMe);
		

        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
		// console.log(expirationDate); //time after which user has to be auto logged out
		
		var d = expirationDate.toString();
		var index = d.lastIndexOf(':') +3;
		// console.log(d.substring(0, index));

		var expiringDate = d.substring(0, index);
		// console.log(expiringDate);

		const expirationDuration = new Date(expiringDate).getTime() - new Date().getTime();

		const user = new User(
			email,
			userId,
			rememberMe,
			token,
			new Date(expirationDuration)
		);
		console.log(user);
		
		this.user.next(user); //storing data in user subject

		this.autoLogout(3600*1000)
		localStorage.setItem('userData', JSON.stringify(user));

	}


	getAuth() {
		if (localStorage.getItem('token')) {
			return true;
		} else {
			return false
		}
	}


	checkRememberMe(){
		const accessTokenObj = localStorage.getItem("token");
		const rememberMe = localStorage.getItem('rememberMe');

		// console.log(accessTokenObj);
		// console.log(rememberMe);

		if (accessTokenObj && rememberMe == 'yes') {


			// this.router.navigate(['/admin/dashboard/main-dashboard']);
		  } else {
			// console.log("You need to login")
		}
		
	}
	
}
