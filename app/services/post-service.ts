import {Injectable} from '@angular/core';
import {Post} from '../models/post';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {PostComment} from "../models/post-comment";
import {Solution} from "../models/solution";
import {Report} from "../models/report";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class PostService {
    serviceUrl: string = "https://resolve-rest.herokuapp.com/posts";
    searchUrl: string = "https://resolve-rest.herokuapp.com/posts/search";
    commentsUrl: string = "https://resolve-rest.herokuapp.com/comments";
    solutionsUrl: string = "https://resolve-rest.herokuapp.com/solutions";
    reportsUrl: string = "https://resolve-rest.herokuapp.com/reports";

    public static POPULAR: string = "votes";
    public static LATEST: string = "date,desc";

    constructor(private http: Http) {
    }

    list(quantity: number, page: number, criteria: string, keywords: string) {
        let url: string;
        if (keywords != null && keywords.length > 3) {
            url = this.searchUrl + "?size=" + quantity + "&page=" + page
                + "&sort=" + criteria + "&keywords=" + keywords;
        } else {
            url = this.serviceUrl + "?size=" + quantity + "&page=" + page
                + "&sort=" + criteria;
        }
        return this.http.get(url).map(res => res.json());
    }

    insert(post: Post): Observable<Post> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify(post);
        return this.http
            .post(this.serviceUrl, body, options)
            .map((res) => res.json())
            .catch((error:any) => Observable.throw(error._body));
    }

    get(id: number) {
        let url = this.serviceUrl + '/' + id;
        return this.http.get(url).map(res => res.json());
    }

    remove(id: number) {
        let url = this.serviceUrl + '/' + id;
        return this.http.delete(url).map(res => res.json());
    }

    addComment(comment: PostComment) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify(comment);
        return this.http.post(this.commentsUrl, body, options).map(res => res.text());
    }

    addSolution(solution: Solution) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify(solution);
        return this.http.post(this.solutionsUrl, body, options).map(res => res.text());
    }

    addVote(username: string, postId: number) {
        let url = this.serviceUrl + '/vote';
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify({username: username, postId: postId});
        return this.http
            .post(url, body, options)
            .map((res) => res.json())
            .catch((error:any) => Observable.throw(error._body));
    }

    addFlag(report: Report) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify(report);
        return this.http
            .post(this.reportsUrl, body, options)
            .map((res) => res.json())
            .catch((error:any) => Observable.throw(error._body));
    }

    listReports() {
        return this.http.get(this.reportsUrl).map(res => res.json());
    }

}