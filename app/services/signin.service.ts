import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class SigninService {
    serviceUrl: string = "https://resolve-rest.herokuapp.com/login";
    private user: User;
    error: string;
    constructor(private http: Http, private router: Router) { }

    signIn(email: string, password: string): Observable<User> {
        return this.http
            .post(this.serviceUrl, { email: email, password: password })
            .map((res) => res.json())
            .catch((error: any) => {
                console.log(error);
                return Observable.throw(error._body)});
    }
}