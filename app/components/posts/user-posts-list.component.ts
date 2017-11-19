import {Component, OnInit} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Post } from "../../models/post";
import { PostService } from "../../services/post-service";
import { UserPostsService } from "../../services/user-posts.service";
import { NgProgressService } from "ngx-progressbar";

@Component({
    selector: 'user-posts-list',
    templateUrl: 'app/views/post/user-posts-list.component.html',
    providers: [PostService, UserPostsService]
})
export class UserPostsListComponent implements OnInit {

    private listUserPosts: Post[];

    error: string;
    
	private page: number = 0;
    
    private pageSize: number = 5;
    
    private criteria: string;
    
    private searchInput: string;
    
    constructor(private userPostsService:UserPostsService,
        private _activatedRoute: ActivatedRoute,
        private progressService: NgProgressService,
        private postService: PostService){}
    
    ngOnInit(){

        let userId = this._activatedRoute.snapshot.params['id'];

        this.userPostsService.listUserPosts(userId)
            .subscribe(res => {
                this.listUserPosts = res;
            });
    }

    refreshList() {
        this.progressService.start();
        this.postService.list(this.pageSize, this.page, this.criteria,
            this.searchInput).subscribe(
            data => {
                this.listUserPosts = data;
                this.progressService.done();
            },
            error => {
                this.error = "Could not list posts";
                this.progressService.done();
            }
        );
    }

    getUserPostsLength(): number {
		if (this.listUserPosts != null)
			return this.listUserPosts.length;
		return 0;
	}


    previousPage() {
        this.page--;
        this.refreshList();
    }

    
    nextPage() {
        this.page++;
        this.refreshList();
    }
}