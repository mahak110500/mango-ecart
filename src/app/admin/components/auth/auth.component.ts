import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
	showError: boolean = false; //to display error
	error: any;
	rememberMe: boolean;


	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit(): void {
		this.rememberMe = false;
		this.checkRememberMe();
	}

	onlogin(loginForm: NgForm) {
		console.log(loginForm.value);


		this.authService.login(loginForm.value.email, loginForm.value.password).subscribe((res) => {
			// console.log(res.result.token);
			localStorage.setItem('token', JSON.stringify(res.result.token));
			this.router.navigate(['/admin/dashboard/main-dashboard']);

			if (this.rememberMe) {
				console.log(this.rememberMe);
				
				localStorage.setItem('rememberMe', 'yes')
			}
			// if(loginForm.value.checkbox === true){
			// 	this.authService.tokenExpirationTimer = null;
			// 	console.log(this.authService.tokenExpirationTimer);

			// }



		}, error => {
			console.log(error);
			this.error = '**Invalid credentials';
		});
	}

	checkRememberMe(){
		const accessTokenObj = localStorage.getItem("token");
		const rememberMe = localStorage.getItem('rememberMe');

		console.log(accessTokenObj);
		console.log(rememberMe);

		if (accessTokenObj && rememberMe == 'yes') {
			this.router.navigate(['/admin/dashboard/main-dashboard']);
		  } else {
			console.log("You need to login")
		}
		
	}

}
