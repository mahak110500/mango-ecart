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
	error: any;
	rememberMe: boolean;


	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit(): void {
		this.rememberMe = false;
	}

	onlogin(loginForm: NgForm) {

		this.authService.login(loginForm.value.email, loginForm.value.password, loginForm.value.checkbox).subscribe((res) => {
			// console.log(res.result.token);
			
			localStorage.setItem('token', JSON.stringify(res.result.token));
			this.router.navigate(['/admin/dashboard/main-dashboard']);


		}, error => {
			console.log(error);
			this.error = '**Invalid credentials';
		});
	}

	// checkRememberMe(){
	// 	const accessTokenObj = localStorage.getItem("token");
	// 	const rememberMe = localStorage.getItem('rememberMe');

	// 	// console.log(accessTokenObj);
	// 	// console.log(rememberMe);

	// 	if (accessTokenObj && rememberMe == 'yes') {
	// 		this.router.navigate(['/admin/dashboard/main-dashboard']);
	// 	  } else {
	// 		// console.log("You need to login")
	// 	}
		
	// }

}
