import {Component, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from '../../services/signin-service';
import {MdSnackBar} from "@angular/material";

@Component({
	selector: 'signIn',
	templateUrl: 'app/views/signin.html',
	providers: [ SigninService, MdSnackBar ]
})
export class SigninComponent {

	private username: string;
	private password: string;

	error: string;

	constructor(private router: Router, private signinService: SigninService, public snackBar: MdSnackBar) {
		this.signinService.loggedUser.subscribe(
			value => {
				console.log(value);
				if (value != "") {
					this.router.navigate(['']);
				}
			},
			error => {
				this.error = "Could not log in";
				this.snackBar.open("Falha ao efetuar login", "OK");
			}
		);
	}

	signIn() {
		this.signinService.signIn(this.username, this.password).subscribe(
			user => {
				if (user != null) {
					sessionStorage['username'] = user.username;
					sessionStorage['userid'] = user.id;
					sessionStorage['permissionid'] = user.permission.id;
					this.router.navigate(['']);
				}
			},
			error => {
				this.snackBar.open("Erro: " + error, "OK");
			}
		);
	}
}