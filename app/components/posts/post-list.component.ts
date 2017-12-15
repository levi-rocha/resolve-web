import {Component, OnInit} from "@angular/core";
import {Post} from "../../models/post";
import {PostService} from "../../services/post.service";
import {AppComponent} from "../../app.component";
import {MdSnackBar} from "@angular/material";
import {NgProgressService} from 'ngx-progressbar';

@Component({
	selector: 'post-list',
	templateUrl: 'app/views/post/post-list.html',
	providers: [PostService]
})
export class PostListComponent implements OnInit {

	private posts: Post[];

	error: string;

	private page: number = 0;

	private pageSize: number = 5;

	private criteria: string;

	private searchInput: string;

	constructor(private postService: PostService,
                public snackBar: MdSnackBar,
                private progressService: NgProgressService) {
	}

    isLogged(): boolean {
        return AppComponent.isLogged();
    }

	ngOnInit() {
	    this.criteria = PostService.LATEST;
	    this.searchInput = "";
		this.refreshList();
	}

	refreshList() {
        this.progressService.start();
        this.postService.list(this.pageSize, this.page, this.criteria,
            this.searchInput).subscribe(
            data => {
                this.posts = data;
                this.progressService.done();
            },
            error => {
                this.error = "Could not list posts";
                this.progressService.done();
            }
        );
    }

    onSearch() {
        this.page = 0;
        this.refreshList();
    }

    enterSearch(event: any) {
        event.preventDefault();
        this.page = 0;
        this.refreshList();
    }

	onTabChange($event: any) {
        if ($event.index == 1) {
            this.criteria = PostService.POPULAR;
        } else {
            this.criteria = PostService.LATEST;
        }
        this.page = 0;
        this.refreshList();
	}

	getPostsLength(): number {
		if (this.posts != null)
			return this.posts.length;
		return 0;
	}

	firstPage() {
        this.page = 0;
        this.refreshList();
    }

    previousPage() {
        this.page--;
        this.refreshList();
    }

    nextPage() {
        this.page++;
        this.refreshList();
    }

    removePost(id: number) {
	    console.log(`ID`, id);
	    this.postService.remove(id).subscribe(
            data => {
                this.snackBar.open("Post removido com sucesso", "OK");
                this.refreshList();
            },
            error => this.snackBar.open("Erro: " + error._body, "OK")
        );
    }

    userIsAdmin(): boolean {
        if (sessionStorage['permissionid'] == "3")
            return true;
        return false;
    }

}