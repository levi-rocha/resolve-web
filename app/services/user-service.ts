import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class UserService {
    serviceUrl: string = "https://resolve-rest.herokuapp.com/users";

    constructor(private http: Http) { }

    listAll() {
        return this.http.get(this.serviceUrl).map(res => res.json());
    }

    insert(user: User) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(user);
        return this.http.post(this.serviceUrl, body, options).map(res => res.text());
    }

    update(user: User) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(user);
        return this.http.patch(this.serviceUrl, body, options).map(res => res.text());
    }

    delete(username: string) {
        let url = this.serviceUrl + '/' + username;
        return this.http.delete(url).map(res => res.text());
    }

    findByUsername(username: string) {
        let url = this.serviceUrl + '/' + username;
        return this.http.get(url).map(res => res.json());
    }

    findByEmail(email: string) {
        let url = this.serviceUrl + '/verifyEmailTaken?email=' + email;
        return this.http.get(url).map(res => res.json());
    }

}