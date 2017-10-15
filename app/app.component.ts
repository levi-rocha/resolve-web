import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {SigninService} from './services/signin-service';
import {Router, NavigationEnd} from "@angular/router";
import {User} from './models/user';
import {UserService} from './services/user-service';
import {MdSnackBar} from "@angular/material";
import {Permission} from "./models/permission";
import {Location} from "@angular/common";
import {NgProgressService} from 'ngx-progressbar';
declare const gapi: any;
declare var jQuery:any;

@Component({
    selector: 'meu-app',
    templateUrl: 'app/menu.html',
    providers: [SigninService, UserService, MdSnackBar, NgProgressService],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
    constructor(private signinService: SigninService,
                private router: Router,
                private _location: Location,
                private userService: UserService,
                public snackBar: MdSnackBar,
                private progressService: NgProgressService) {
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
    
    signUp() {
        this.signUserUp(this.user);
    }

	public googleInit() {
		gapi.load('auth2', () => {
			this.auth2 = gapi.auth2.init({
				client_id: this.gClientID,
				cookiepolicy: 'single_host_origin',
				scope: 'profile email'
			});
            this.attachSignin(document.getElementById('googleSignIn'));
            this.attachSignin(document.getElementById('googleSignUp'));
		});
	}

	public attachSignin(element) {
		this.auth2.attachClickHandler(element, {},
			(googleUser) => {
                let profile = googleUser.getBasicProfile();
                let username = profile.getName();
                let password = profile.getId();
                let email = profile.getEmail();
                this.userService.findByEmail(email).subscribe(
                    emailExists => {
                        if (emailExists) {
                            this.signUserIn(username, password);
                        } else {
                            let newUser: User = new User();
                            newUser.username = username;
                            newUser.email = email;
                            newUser.password = password;
                            newUser.permission = new Permission(1);
                            this.signUserUp(newUser);
                        }
                    },
                    error => {
                        this.snackBar.open("Erro: " + error, "OK");
                    }
                );
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
                    jQuery("#signUpModal").modal("hide");
                    jQuery("#signInModal").modal("hide");
                    // document.getElementById('close-signupmodal').click();
                    // document.getElementById('close-signinmodal').click();
                    // document.getElementById('logoButton').click();
                    this.router.navigate(['/post-list']);
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
                this.signUserIn(user.username, user.password);
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