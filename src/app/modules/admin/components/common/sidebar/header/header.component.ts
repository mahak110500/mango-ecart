import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	showMore = 'USER'
	hidden: boolean;


	constructor(private authService: AuthService) { }

	ngOnInit(): void {
	}

	toggle() {
		this.hidden = !this.hidden;
		if (this.hidden) {
			this.showMore = 'show less'
		}

		if (!this.hidden) {
			this.showMore = ' show more'
		}
	}

	onLogout() {
		this.authService.logout();
	}

}
