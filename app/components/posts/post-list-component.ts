import {Component, OnInit} from "@angular/core";
import {Post} from "../../models/post";
import {PostService} from "../../services/post-service";
import {AppComponent} from "../../app.component";

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

	constructor(private postService: PostService) {
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
        this.postService.list(this.pageSize, this.page, this.criteria,
            this.searchInput).subscribe(
            data => this.posts = data,
            error => this.error = "Could not list posts"
        );
    }

    onSearch() {
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

}