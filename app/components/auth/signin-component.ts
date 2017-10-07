import {Component, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { SigninService } from '../../services/signin-service';
import {MdSnackBar} from "@angular/material";
declare const gapi: any;

@Component({
	selector: 'signIn',
	templateUrl: 'app/views/signin.html',
	providers: [ SigninService, MdSnackBar ]
})
export class SigninComponent {

	private username: string;
	private password: string;
	private gClientID: string = "1088160350239-qdg3e6j7jtlprpnukkuet4et5h3oj4j3.apps.googleusercontent.com";
	public auth2: any;

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

	public googleInit() {
		gapi.load('auth2', () => {
			this.auth2 = gapi.auth2.init({
				client_id: this.gClientID,
				cookiepolicy: 'single_host_origin',
				scope: 'profile email'
			});
			this.attachSignin(document.getElementById('googleBtn'));
		});
	}

	public attachSignin(element) {
		this.auth2.attachClickHandler(element, {},
			(googleUser) => {
				let profile = googleUser.getBasicProfile();
				console.log('Token || ' + googleUser.getAuthResponse().id_token);
				console.log('ID: ' + profile.getId());
				console.log('Name: ' + profile.getName());
				console.log('Image URL: ' + profile.getImageUrl());
				console.log('Email: ' + profile.getEmail());

				//TODO: verificar se cadastrado: se não, cadastrar. se sim, logar.

			}, (error) => {
				alert(JSON.stringify(error, undefined, 2));
			});
	}

	ngAfterViewInit(){
		this.googleInit();
	}
}