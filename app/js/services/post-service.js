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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var PostService = (function () {
    function PostService(http) {
        this.http = http;
        this.serviceUrl = "https://resolve-rest.herokuapp.com/posts";
        this.searchUrl = "https://resolve-rest.herokuapp.com/posts/search";
        this.commentsUrl = "https://resolve-rest.herokuapp.com/comments";
        this.solutionsUrl = "https://resolve-rest.herokuapp.com/solutions";
        this.reportsUrl = "https://resolve-rest.herokuapp.com/reports";
    }
    PostService.prototype.list = function (quantity, page, criteria, keywords) {
        var url;
        if (keywords != null && keywords.length > 3) {
            url = this.searchUrl + "?size=" + quantity + "&page=" + page
                + "&sort=" + criteria + "&keywords=" + keywords;
        }
        else {
            url = this.serviceUrl + "?size=" + quantity + "&page=" + page
                + "&sort=" + criteria;
        }
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    PostService.prototype.insert = function (post) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(post);
        return this.http
            .post(this.serviceUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error._body); });
    };
    PostService.prototype.get = function (id) {
        var url = this.serviceUrl + '/' + id;
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    PostService.prototype.remove = function (id) {
        var url = this.serviceUrl + '/' + id;
        return this.http.delete(url).map(function (res) { return res.json(); });
    };
    PostService.prototype.addComment = function (comment) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(comment);
        return this.http.post(this.commentsUrl, body, options).map(function (res) { return res.text(); });
    };
    PostService.prototype.addSolution = function (solution) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(solution);
        return this.http.post(this.solutionsUrl, body, options).map(function (res) { return res.text(); });
    };
    PostService.prototype.addVote = function (username, postId) {
        var url = this.serviceUrl + '/vote';
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify({ username: username, postId: postId });
        return this.http
            .post(url, body, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error._body); });
    };
    PostService.prototype.addFlag = function (report) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var body = JSON.stringify(report);
        return this.http
            .post(this.reportsUrl, body, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error._body); });
    };
    PostService.prototype.listReports = function () {
        return this.http.get(this.reportsUrl).map(function (res) { return res.json(); });
    };
    return PostService;
}());
PostService.POPULAR = "votes";
PostService.LATEST = "date";
PostService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post-service.js.map