import {Component, OnInit} from "@angular/core";
import {Post} from "../../models/post";
import {PostService} from "../../services/post-service";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {User} from "../../models/user";

@Component({
    selector: 'new-post',
    templateUrl: 'app/views/post/new-post.html',
    providers: [PostService]
})
export class NewPostComponent implements OnInit {
    private post: Post;
    error: string;

    constructor(private router: Router, private postService: PostService) {
    }

    ngOnInit() {
        this.post = new Post();
    }

    submit() {
        this.post.author = new User();
        this.post.author.username = AppComponent.loggedUsername();
        this.postService.insert(this.post).subscribe(
            data => {
                this.router.navigate(['/post/' + data.id])
            },
            error => {alert(error)}
        );
    }
}