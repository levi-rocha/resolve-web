import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user-service';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MdSnackBar} from "@angular/material";
import {Permission} from "../../models/permission";
declare const gapi: any;

@Component({
    selector: 'user-signup',
    templateUrl: 'app/views/users/signup.html',
    providers: [UserService]
})
export class UserSignupComponent implements OnInit {

    private gClientID: string = "1088160350239-qdg3e6j7jtlprpnukkuet4et5h3oj4j3.apps.googleusercontent.com";
    public auth2: any;

    private user: User;

    error: string;

    private usernameTaken: boolean;

    private permissions: Permission[];

    constructor(private _location: Location,
                private router: Router,
                private userService:
                    UserService,
                public snackBar: MdSnackBar) {
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

    signUp() {
        this.signUserUp(this.user);
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
                let newUser : User = new User();
                newUser.username = profile.getName();
                newUser.email = profile.getEmail();
                newUser.password = profile.getId();
                newUser.permission = new Permission(1);
                this.signUserUp(newUser);
            }, (error) => {
                alert(JSON.stringify(error, undefined, 2));
            });
    }

    public signUserUp(user: User) {
        this.userService.insert(user).subscribe(
            data => {
                this.snackBar.open("Usuario cadastrado com suceso", "OK");
                this.router.navigate(['/user-list']);
            },
            error => this.snackBar.open("Erro: " + error._body, "OK")
        );
    }

    ngAfterViewInit(){
        this.googleInit();
    }
}