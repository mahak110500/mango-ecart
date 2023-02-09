import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmPasswordValidator } from './confirmed.validator';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
	error: any;
	authFormGroup: FormGroup;
	authData: any;
	accessToken: any;

	constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private activeRoute: ActivatedRoute) {

	}

	ngOnInit(): void {


		this.authFormGroup = this.fb.group({

			password: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
			token: ['']

		},
		{
			validator: ConfirmPasswordValidator("password", "confirmPassword")
		}
		)

		this.activeRoute.queryParams
			.subscribe((res) => {
				this.accessToken = res;
				// console.log(this.accessToken);
				this.authFormGroup.patchValue({
					token: this.accessToken.token
				})
			});
	}


	onSubmit(authFormGroup) {
		this.authData = authFormGroup.value;

		this.authService.getResetPassword({ password: this.authData.password, token: this.authData.token }).subscribe((res) => {
			window.alert('Password changed successfully')

			this.router.navigate(['/admin/auth']);

		}, error => {
			console.log(error);
			this.error = error.error.message

		})


	}
}
