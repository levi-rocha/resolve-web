import {Component, ViewEncapsulation} from '@angular/core';
import {SigninService} from './services/signin-service';
import {Router} from "@angular/router";
import {NgProgressService} from "ngx-progressbar";

@Component({
    selector: 'meu-app',
    templateUrl: 'app/menu.html',
    providers: [SigninService],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    constructor(private signinService: SigninService, private router: Router,
                public progressService: NgProgressService) {
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

    signOut(): void{
        sessionStorage.clear();
        this.router.navigate(['/post-list']);
    }

    userIsAdmin(): boolean {
        if (sessionStorage['permissionid'] == "3")
            return true;
        return false;
    }
}