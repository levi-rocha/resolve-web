import {Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {Post} from "../../models/post";
import {PostService} from "../../services/post-service";
import { UserPostsService } from "../../services/user-posts.service";

@Component({
    selector: 'user-posts-list',
    templateUrl: 'app/views/post/user-posts-list.component.html',
    providers: [PostService]
})
export class UserPostsListComponent implements OnInit {

    private listUserPosts: Post[];
    
    constructor(private userPostsService:UserPostsService,
        private _activatedRoute: ActivatedRoute){}
    
    ngOnInit(){

        let userId = this._activatedRoute.snapshot.params['id'];

        this.userPostsService.listUserPosts(userId)
            .subscribe(res => {
                this.listUserPosts = res;
            });
    }
}