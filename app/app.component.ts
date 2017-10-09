import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {SigninService} from './services/signin-service';
import {Router} from "@angular/router";
import {User} from './models/user';
import {UserService} from './services/user-service';
import {MdSnackBar} from "@angular/material";
import {Permission} from "./models/permission";
import {Location} from "@angular/common";

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
                public snackBar: MdSnackBar) {
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

    private user: User;
    error: string;
    private usernameTaken: boolean;
    private username: string;
    private password: string;
    private permissions: Permission[];


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

    signUp() {
        this.userService.insert(this.user).subscribe(
            data => {
                this.snackBar.open("Usuario cadastrado com suceso", "OK");
                this.router.navigate(['/user-list']);
            },
            error => this.snackBar.open("Erro: " + error._body, "OK")
        );
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