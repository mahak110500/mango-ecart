import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Authdata {
	result: any;
	email: string,
	password: string,
	token: string
}


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient, private router: Router) { }

	login(email: string, password: string) {
		return this.http.post<Authdata>(`http://103.127.29.85:3006/api/admin-auth/login`,
			{ email, password }
		)
	}

	logout(){
		localStorage.removeItem('token');
		this.router.navigate(['auth']);

	}

	getAuth() {
		if (localStorage.getItem('token')) {
			return true;
		} else {
			return false
		}
	}
}
