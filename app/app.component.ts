import {Component, ViewEncapsulation} from '@angular/core';
import {SigninService} from './services/signin-service';
import {Router} from "@angular/router";

@Component({
    selector: 'meu-app',
    templateUrl: 'app/menu.html',
    providers: [SigninService],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    constructor(private signinService: SigninService, private router: Router) {
        // this.signinService.loggedUser.subscribe(
        //   value => {
        //     this.loggedUsername = value;
        //     console.log("loggedUser changed: " + value);
        //   }, error => console.log("error")
        // );
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
        this.router.navigate(['/signIn']);
    }

    userIsAdmin(): boolean {
        if (sessionStorage['permissionid'] == "3")
            return true;
        return false;
    }
}