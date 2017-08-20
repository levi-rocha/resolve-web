import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user-service';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MdSnackBar} from "@angular/material";
import {Permission} from "../../models/permission";

@Component({
    selector: 'user-signup',
    templateUrl: 'app/views/users/signup.html',
    providers: [UserService]
})
export class UserSignupComponent implements OnInit {

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