import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs/Rx';
import {Router} from "@angular/router";

@Injectable()
export class SigninService {

    serviceUrl: string = "https://resolve-rest.herokuapp.com/login";

    private user: User;

    error: string;

    loggedUser = new BehaviorSubject("");
    private router: Router;

    constructor(private http: Http) {}

    // signIn(username: string, password: string) {
    //     this.validateAndGetUser(username, password).subscribe(
    //         data => {
    //             this.user = data;
    //             if (this.user != null) {
    //                 console.log("succesful");
    //                 sessionStorage['username'] = this.user.username;
    //                 this.loggedUser.next(this.user.username);
    //             }
    //         },
    //         error => {
    //             this.error = "Could not sign in";
    //             console.log("could not sign in");
    //         }
    //     );
    // }

    signOut() {
        delete sessionStorage['username'];
        this.loggedUser.next("");
        this.router.navigate(['/signIn']);
    }

    static signedIn() {
        return sessionStorage['username'] != null;
    }

    signIn(username: string, password: string) : Observable<User> {
        return this.http
            .post(this.serviceUrl, {username: username, password: password})
            .map((res) => res.json())
            .catch((error:any) => Observable.throw(error._body));
    }
}