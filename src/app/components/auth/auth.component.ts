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
	

	constructor(private authService:AuthService,private router: Router) { }

	ngOnInit(): void {
	}

	onlogin(loginForm: NgForm) {
		
		this.authService.login(loginForm.value.email,loginForm.value.password).subscribe((res) => {
			// console.log(res.result.token);

			if(res){
				localStorage.setItem('token', JSON.stringify(res.result.token));

				this.router.navigate(['/dashboard/main-dashboard']);

			}else{
				console.log('error');
				this.showError = true;
				
			}
		})
	}

}
