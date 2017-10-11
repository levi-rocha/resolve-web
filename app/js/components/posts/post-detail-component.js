"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var post_service_1 = require("../../services/post-service");
var router_1 = require("@angular/router");
var post_1 = require("../../models/post");
var material_1 = require("@angular/material");
var post_comment_1 = require("../../models/post-comment");
var app_component_1 = require("../../app.component");
var user_1 = require("../../models/user");
var solution_1 = require("../../models/solution");
var report_1 = require("../../models/report");
var PostDetailComponent = (function () {
    function PostDetailComponent(router, route, postService, snackBar) {
        this.router = router;
        this.route = route;
        this.postService = postService;
        this.snackBar = snackBar;
        this.showSolutions = true;
        this.showComments = true;
        this.showFlag = false;
    }
    PostDetailComponent.prototype.ngOnInit = function () {
        this.reloadPost();
    };
    PostDetailComponent.prototype.isLogged = function () {
        return app_component_1.AppComponent.isLogged();
    };
    PostDetailComponent.prototype.userIsAdmin = function () {
        if (sessionStorage['permissionid'] == "3")
            return true;
        return false;
    };
    PostDetailComponent.prototype.reloadPost = function () {
        var _this = this;
        this.post = new post_1.Post();
        this.post.id = +this.route.snapshot.params['id'];
        this.postService.get(this.post.id).subscribe(function (data) { return _this.post = data; }, function (error) { return _this.snackBar.open("Não foi possível carregar o post", "OK"); });
    };
    PostDetailComponent.prototype.submitNewComment = function () {
        var _this = this;
        var comment = new post_comment_1.PostComment();
        comment.content = this.newComment;
        comment.author = new user_1.User();
        comment.author.username = app_component_1.AppComponent.loggedUsername();
        comment.post = new post_1.Post();
        comment.post.id = this.post.id;
        this.postService.addComment(comment).subscribe(function (data) {
            _this.newComment = null;
            _this.reloadPost();
        }, function (error) { return _this.snackBar.open("Erro ao enviar comentário", "OK"); });
    };
    PostDetailComponent.prototype.submitNewSolution = function () {
        var _this = this;
        var solution = new solution_1.Solution();
        solution.content = this.newSolution;
        solution.author = new user_1.User();
        solution.author.username = app_component_1.AppComponent.loggedUsername();
        solution.post = new post_1.Post();
        solution.post.id = this.post.id;
        this.postService.addSolution(solution).subscribe(function (data) {
            _this.newSolution = null;
            _this.reloadPost();
        }, function (error) { return _this.snackBar.open("Erro ao enviar solucao", "OK"); });
    };
    PostDetailComponent.prototype.voteOnPost = function () {
        var _this = this;
        if (!this.isLogged()) {
            this.router.navigate(['/signIn']);
        }
        else {
            this.postService.addVote(sessionStorage['username'], this.post.id).subscribe(function (data) { return _this.reloadPost(); }, function (error) { return _this.snackBar.open('Erro:' + error, "OK"); });
        }
    };
    PostDetailComponent.prototype.toggleShowFlag = function () {
        if (this.showFlag)
            this.showFlag = false;
        else
            this.showFlag = true;
    };
    PostDetailComponent.prototype.flagPost = function () {
        var _this = this;
        var report = new report_1.Report();
        report.description = this.newFlag;
        report.author = new user_1.User();
        report.author.username = app_component_1.AppComponent.loggedUsername();
        report.post = new post_1.Post();
        report.post.id = this.post.id;
        this.postService.addFlag(report).subscribe(function (data) {
            _this.newFlag = null;
            _this.toggleShowFlag();
            _this.reloadPost();
            _this.snackBar.open('Post reportado com sucesso', "OK");
        }, function (error) { return _this.snackBar.open('Erro:' + error, "OK"); });
    };
    PostDetailComponent.prototype.getVotes = function () {
        if (this.post.voteIds != null)
            return this.post.voteIds.length;
        return 0;
    };
    PostDetailComponent.prototype.userHasVoted = function () {
        if (this.post.voteIds != null && this.post.voteIds.indexOf(+sessionStorage['userid']) >= 0)
            return true;
        return false;
    };
    PostDetailComponent.prototype.userCanPostSolution = function () {
        if (sessionStorage['permissionid'] == '2')
            return true;
        return false;
    };
    PostDetailComponent.prototype.toggleShowComments = function () {
        if (this.showComments)
            this.showComments = false;
        else
            this.showComments = true;
    };
    PostDetailComponent.prototype.toggleShowSolutions = function () {
        if (this.showSolutions)
            this.showSolutions = false;
        else
            this.showSolutions = true;
    };
    PostDetailComponent.prototype.removePostDetail = function (id) {
        var _this = this;
        console.log("ID", id);
        this.postService.remove(id).subscribe(function (data) {
            _this.snackBar.open("Post removido com sucesso", "OK");
            _this.router.navigate(['/post-list']);
        }, function (error) { return _this.snackBar.open("Erro: " + error._body, "OK"); });
        debugger;
    };
    return PostDetailComponent;
}());
PostDetailComponent = __decorate([
    core_1.Component({
        selector: 'post-detail',
        templateUrl: 'app/views/post/detail.html',
        providers: [post_service_1.PostService, material_1.MdSnackBar]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        post_service_1.PostService,
        material_1.MdSnackBar])
], PostDetailComponent);
exports.PostDetailComponent = PostDetailComponent;
//# sourceMappingURL=post-detail-component.js.map