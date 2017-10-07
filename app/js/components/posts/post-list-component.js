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
var app_component_1 = require("../../app.component");
var material_1 = require("@angular/material");
var PostListComponent = (function () {
    function PostListComponent(postService, snackBar) {
        this.postService = postService;
        this.snackBar = snackBar;
        this.page = 0;
        this.pageSize = 5;
    }
    PostListComponent.prototype.isLogged = function () {
        return app_component_1.AppComponent.isLogged();
    };
    PostListComponent.prototype.ngOnInit = function () {
        this.criteria = post_service_1.PostService.LATEST;
        this.searchInput = "";
        this.refreshList();
    };
    PostListComponent.prototype.refreshList = function () {
        var _this = this;
        this.postService.list(this.pageSize, this.page, this.criteria, this.searchInput).subscribe(function (data) { return _this.posts = data; }, function (error) { return _this.error = "Could not list posts"; });
    };
    PostListComponent.prototype.onSearch = function () {
        this.page = 0;
        this.refreshList();
    };
    PostListComponent.prototype.onTabChange = function ($event) {
        if ($event.index == 1) {
            this.criteria = post_service_1.PostService.POPULAR;
        }
        else {
            this.criteria = post_service_1.PostService.LATEST;
        }
        this.page = 0;
        this.refreshList();
    };
    PostListComponent.prototype.getPostsLength = function () {
        if (this.posts != null)
            return this.posts.length;
        return 0;
    };
    PostListComponent.prototype.firstPage = function () {
        this.page = 0;
        this.refreshList();
    };
    PostListComponent.prototype.previousPage = function () {
        this.page--;
        this.refreshList();
    };
    PostListComponent.prototype.nextPage = function () {
        this.page++;
        this.refreshList();
    };
    PostListComponent.prototype.removePost = function (id) {
        var _this = this;
        console.log("ID", id);
        this.postService.remove(id).subscribe(function (data) {
            _this.snackBar.open("Post removido com sucesso", "OK");
            _this.refreshList();
        }, function (error) { return _this.snackBar.open("Erro: " + error._body, "OK"); });
        debugger;
    };
    PostListComponent.prototype.userIsAdmin = function () {
        if (sessionStorage['permissionid'] == "3")
            return true;
        return false;
    };
    return PostListComponent;
}());
PostListComponent = __decorate([
    core_1.Component({
        selector: 'post-list',
        templateUrl: 'app/views/post/post-list.html',
        providers: [post_service_1.PostService]
    }),
    __metadata("design:paramtypes", [post_service_1.PostService,
        material_1.MdSnackBar])
], PostListComponent);
exports.PostListComponent = PostListComponent;
//# sourceMappingURL=post-list-component.js.map