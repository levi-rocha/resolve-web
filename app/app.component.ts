import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { SigninService } from './services/signin.service';
import { Router, NavigationEnd } from "@angular/router";
import { User } from './models/user';
import { SigninModalService } from './services/signin-modal.service';
import { UserService } from './services/user.service';
import { MdSnackBar } from "@angular/material";
import { Permission } from "./models/permission";
import { Location } from "@angular/common";
import { NgProgressService } from 'ngx-progressbar';    

declare const gapi: any;
declare var jQuery: any;

@Component({
    selector: 'meu-app',
    templateUrl: 'app/menu.html',
    providers: [SigninService, UserService, MdSnackBar, NgProgressService],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    @ViewChild('templateModalSignIn') templateModalSignIn;

    constructor(private signinService: SigninService,
        private router: Router,
        private _location: Location,
        private userService: UserService,
        public snackBar: MdSnackBar,
        private progressService: NgProgressService,
        private siginModalService:SigninModalService) {
    }


    private user: User;
    error: string;
    private emailTaken: boolean;
    private email: string;
    private username: string;
    private password: string;
    private permissions: Permission[];
    private gClientID: string = "1088160350239-qdg3e6j7jtlprpnukkuet4et5h3oj4j3.apps.googleusercontent.com";
    public auth2: any;

    userPosts() {
        this.router.navigate(['user-posts-list', sessionStorage["userid"]]);
    }

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

    signOut(): void {
        sessionStorage.clear();
        this.router.navigate(['/post-list']);
    }

    userIsAdmin(): boolean {
        if (sessionStorage['permissionid'] == "3")
            return true;
        return false;
    }

    goBack() {
        this._location.back();
    }

    ngOnInit() {
        this.user = new User();
        this.emailTaken = false;
        this.permissions = [
            new Permission(1, "Padrão"),
            new Permission(2, "Empresa"),
        ];
    }

    signIn() {
        this.signUserIn(this.email, this.password);
        this.siginModalService.close();
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
                            this.signUserIn(email, password);
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
                alert("nao deu");
            });
    }

    public signUserIn(email: string, passsword: string) {
        this.progressService.start();
        this.signinService.signIn(email, passsword).subscribe(
            user => {
                this.progressService.done();
                if (user != null) {
                    sessionStorage['username'] = user.username;
                    sessionStorage['userid'] = user.id;
                    sessionStorage['permissionid'] = user.permission.id;
                    jQuery("#signUpModal").modal("hide");
                    this.siginModalService.close();
                    
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

    public openModal() {
        this.siginModalService.open();
        this.googleInit();
    }

    public signUserUp(user: User) {
        this.progressService.start();
        this.userService.insert(user).subscribe(
            data => {
                this.snackBar.open("Usuario cadastrado com sucesso", "OK");
                this.progressService.done();
                this.signUserIn(user.email, user.password);
            },
            error => {
                this.snackBar.open("Erro: " + error._body, "OK");
                this.progressService.done();
            }
        );
    }

    ngAfterViewInit() {
        
        this.siginModalService.template = this.templateModalSignIn;
        
    }

    onBlur() {
        this.userService.findByEmail(this.user.email).subscribe(
            data => {
                this.emailTaken = data;
            },
            error => {
                this.emailTaken = false;
            }
        );
    }

}