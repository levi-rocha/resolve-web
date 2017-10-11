import {Component, OnInit} from "@angular/core";
import {PostService} from "../../services/post-service";
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../models/post";
import {MdSnackBar} from "@angular/material";
import {PostComment} from "../../models/post-comment";
import {AppComponent} from "../../app.component";
import {User} from "../../models/user";
import {Solution} from "../../models/solution";
import {Report} from "../../models/report";

@Component({
    selector: 'post-detail',
    templateUrl: 'app/views/post/detail.html',
    providers: [PostService, MdSnackBar]
})
export class PostDetailComponent implements OnInit {


    private post: Post;
    private newComment: string;
    private newSolution: string;
    private newFlag: string;

    private showSolutions: boolean = true;
    private showComments: boolean = true;
    private showFlag: boolean = false;



    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private postService: PostService,
        public snackBar: MdSnackBar) {
    }

    ngOnInit() {
        this.reloadPost();
    }

    isLogged(): boolean {
        return AppComponent.isLogged();
    }

    userIsAdmin(): boolean {
        if (sessionStorage['permissionid'] == "3")
            return true;
        return false;
    }

    private reloadPost() {
        this.post = new Post();
        this.post.id = +this.route.snapshot.params['id'];
        this.postService.get(this.post.id).subscribe(
            data => this.post = data,
            error => this.snackBar.open("Não foi possível carregar o post", "OK")
        );
    }

    submitNewComment(): void {
        let comment = new PostComment();
        comment.content = this.newComment;
        comment.author = new User();
        comment.author.username = AppComponent.loggedUsername();
        comment.post = new Post();
        comment.post.id = this.post.id;
        this.postService.addComment(comment).subscribe(
            data => {
                this.newComment = null;
                this.reloadPost();
            },
            error => this.snackBar.open("Erro ao enviar comentário", "OK")
        )
    }

    submitNewSolution() {
       let solution = new Solution();
       solution.content = this.newSolution;
       solution.author = new User();
       solution.author.username = AppComponent.loggedUsername();
       solution.post = new Post();
       solution.post.id = this.post.id;
       this.postService.addSolution(solution).subscribe(
           data => {
               this.newSolution = null;
               this.reloadPost();
           },
           error => this.snackBar.open("Erro ao enviar solucao", "OK")
       );
    }

    voteOnPost() {
        if (!this.isLogged()) {
            this.router.navigate(['/signIn']);
        } else {
            this.postService.addVote(sessionStorage['username'], this.post.id).subscribe(
                data => this.reloadPost(),
                error => this.snackBar.open('Erro:' + error, "OK")
            );
        }

    }

    toggleShowFlag() {
        if (this.showFlag)
            this.showFlag = false;
        else
            this.showFlag = true;
    }

    flagPost() {
        let report = new Report();
        report.description = this.newFlag;
        report.author = new User();
        report.author.username = AppComponent.loggedUsername();
        report.post = new Post();
        report.post.id = this.post.id;
        this.postService.addFlag(report).subscribe(
            data => {
                this.newFlag = null;
                this.toggleShowFlag();
                this.reloadPost();
                this.snackBar.open('Post reportado com sucesso', "OK");
            },
            error => this.snackBar.open('Erro:' + error, "OK")
        );
    }

    getVotes(): number {
        if (this.post.voteIds != null)
            return this.post.voteIds.length;
        return 0;
    }

    userHasVoted(): boolean {
        if (this.post.voteIds != null && this.post.voteIds.indexOf(+sessionStorage['userid']) >= 0)
            return true;
        return false;
    }

    userCanPostSolution(): boolean {
        if (sessionStorage['permissionid'] == '2')
            return true;
        return false;
    }

    toggleShowComments() {
        if (this.showComments)
            this.showComments = false;
        else
            this.showComments = true;
    }

    toggleShowSolutions() {
        if (this.showSolutions)
            this.showSolutions = false;
        else
            this.showSolutions = true;
    }
    removePostDetail(id: number) {
        console.log(`ID`, id);
        this.postService.remove(id).subscribe(
            data => {
                this.snackBar.open("Post removido com sucesso", "OK");
                this.router.navigate(['/post-list']);
            },
            error => this.snackBar.open("Erro: " + error._body, "OK")
        );debugger;
    }

}