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
	error:any;
	
	

	constructor(private authService:AuthService,private router: Router) { }

	ngOnInit(): void {
	}

	onlogin(loginForm: NgForm) {
		
		this.authService.login(loginForm.value.email,loginForm.value.password).subscribe((res) => {
			// console.log(res.result.token);
			localStorage.setItem('token', JSON.stringify(res.result.token));
			this.router.navigate(['/dashboard/main-dashboard']);


		}, error=> {
			console.log(error);
			this.error = '**Invalid credentials';
		});
	}

}
