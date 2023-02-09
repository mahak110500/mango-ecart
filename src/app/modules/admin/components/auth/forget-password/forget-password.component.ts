import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-forget-password',
	templateUrl: './forget-password.component.html',
	styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
	error: any;


	constructor(private authService: AuthService) { }

	ngOnInit(): void {
	}

	onSubmit(authForm:NgForm){
		console.log(authForm.value);

		this.authService.getForgetPassword(authForm.value.email).subscribe((res)=>{
			console.log(res);
			window.alert('Reset link has been sent to your email')
			
		}, error => {
			console.log(error);
			this.error = "*Email address does not exists"
			
		})
	}

}
