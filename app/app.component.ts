import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {SigninService} from './services/signin-service';
import {Router} from "@angular/router";
import {User} from './models/user';
import {UserService} from './services/user-service';
import {MdSnackBar} from "@angular/material";
import {Permission} from "./models/permission";
import {Location} from "@angular/common";
import {NgProgressService} from 'ngx-progressbar';
declare const gapi: any;

@Component({
    selector: 'meu-app',
    templateUrl: 'app/menu.html',
    providers: [SigninService, UserService, MdSnackBar],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
    constructor(private signinService: SigninService,
                private router: Router,
                private _location: Location,
                private userService: UserService,
                public snackBar: MdSnackBar,
                private progressService: NgProgressService) {
        // this.signinService.loggedUser.subscribe(
        //     value => {
        //         console.log(value);
        //         if (value != "") {
        //             this.router.navigate(['']);
        //         }
        //     },
        //     error => {
        //         this.error = "Could not log in";
        //         this.snackBar.open("Falha ao efetuar login", "OK");
        //     }
        // );
    }

    private user: User;
    error: string;
    private usernameTaken: boolean;
    private username: string;
    private password: string;
    private permissions: Permission[];
    private gClientID: string = "1088160350239-qdg3e6j7jtlprpnukkuet4et5h3oj4j3.apps.googleusercontent.com";
    public auth2: any;


    static isLogged(): boolean {
        return sessionStorage['username'] != null;
    }

    isLogged(): boolean {
        return AppComponent.isLogged();
    }

    static loggedUsername(): string {
        return sessionStorage['username'] || '';
    }

    loggedUsername(): string {
        return AppComponent.loggedUsername();
    }

    signOut(): void{
        sessionStorage.clear();
        this.router.navigate(['/post-list']);
    }

    userIsAdmin(): boolean {
        if (sessionStorage['permissionid'] == "3")
            return true;
        return false;
    }

    goBack(){
        this._location.back();
    }

    ngOnInit() {
        this.user = new User();
        this.usernameTaken = false;
        this.permissions = [
            new Permission(1, "standard"),
            new Permission(2, "professional"),
        ];
    }
    
    signIn() {
		this.signUserIn(this.username, this.password);
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
				//TODO: verificar se cadastrado: se não, cadastrar.
				let profile = googleUser.getBasicProfile();
				let username = profile.getName();
				let password = profile.getId();
				this.signUserIn(username, password);
			}, (error) => {
				alert(JSON.stringify(error, undefined, 2));
			});
	}

	public signUserIn(username: string, passsword: string) {
        this.progressService.start();
		this.signinService.signIn(username, passsword).subscribe(
			user => {
                this.progressService.done();
				if (user != null) {
					sessionStorage['username'] = user.username;
					sessionStorage['userid'] = user.id;
					sessionStorage['permissionid'] = user.permission.id;
					this.router.navigate(['']);
				}
			},
			error => {
                this.progressService.done();
				this.snackBar.open("Erro: " + error, "OK");
			}
		);
    }
    
    
    public signUserUp(user: User) {
        this.progressService.start();
        this.userService.insert(user).subscribe(
            data => {
                this.snackBar.open("Usuario cadastrado com suceso", "OK");
                this.progressService.done();
                this.router.navigate(['/post-list']);
            },
            error => {
                this.snackBar.open("Erro: " + error._body, "OK");
                this.progressService.done();
            }
        );
    }

	ngAfterViewInit(){
		this.googleInit();
	}

    onBlur() {
        this.userService.findByUsername(this.user.username).subscribe(
            data => {
                this.usernameTaken = true;
            },
            error => {
                this.usernameTaken = false;
            }
        );
    }

}