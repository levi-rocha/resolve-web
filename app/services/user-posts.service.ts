import {Injectable} from '@angular/core';
import {Post} from '../models/post';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {PostComment} from "../models/post-comment";
import {Solution} from "../models/solution";
import {Report} from "../models/report";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class UserPostsService {
    serviceUrl: string = "https://resolve-rest.herokuapp.com/posts";

    constructor(private http: Http) { }

    listUserPosts(authorId: number){
       return this.http.get(`${this.serviceUrl}/byAuthor/${authorId}`)
            .map(res => res.json());
    }




}