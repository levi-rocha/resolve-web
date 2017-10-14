import {Component, OnInit} from "@angular/core";
import {Post} from "../../models/post";
import {PostService} from "../../services/post-service";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {User} from "../../models/user";
import {NgProgressService} from 'ngx-progressbar';

@Component({
    selector: 'new-post',
    templateUrl: 'app/views/post/new-post.html',
    providers: [PostService]
})
export class NewPostComponent implements OnInit {
    private post: Post;
    error: string;

    constructor(private router: Router,
                private postService: PostService,
                private progressService: NgProgressService) {
    }

    ngOnInit() {
        this.post = new Post();
    }

    submit() {
        this.progressService.start();
        this.post.author = new User();
        this.post.author.username = AppComponent.loggedUsername();
        this.postService.insert(this.post).subscribe(
            data => {
                this.router.navigate(['/post/' + data.id]);
                this.progressService.done();
            },
            error => {
                alert(error);
                this.progressService.done();
            }
        );
    }
}