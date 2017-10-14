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
var material_1 = require("@angular/material");
var ngx_progressbar_1 = require("ngx-progressbar");
var ReportListComponent = (function () {
    function ReportListComponent(postService, snackBar, progressService) {
        this.postService = postService;
        this.snackBar = snackBar;
        this.progressService = progressService;
    }
    ReportListComponent.prototype.ngOnInit = function () {
        this.refreshList();
    };
    ReportListComponent.prototype.refreshList = function () {
        var _this = this;
        this.progressService.start();
        this.postService.listReports().subscribe(function (data) {
            _this.reports = data;
            _this.progressService.done();
        }, function (error) {
            _this.snackBar.open("Erro: " + error._body, "OK");
            _this.progressService.done();
        });
    };
    ReportListComponent.prototype.removeReportPost = function (id) {
        var _this = this;
        this.progressService.start();
        this.postService.remove(id).subscribe(function (data) {
            _this.snackBar.open("Post removido com sucesso", "OK");
            _this.progressService.done();
            _this.refreshList();
        }, function (error) {
            _this.snackBar.open("Erro: " + error._body, "OK");
            _this.progressService.done();
        });
    };
    return ReportListComponent;
}());
ReportListComponent = __decorate([
    core_1.Component({
        selector: 'report-list',
        templateUrl: 'app/views/post/report-list.html',
        providers: [post_service_1.PostService]
    }),
    __metadata("design:paramtypes", [post_service_1.PostService,
        material_1.MdSnackBar,
        ngx_progressbar_1.NgProgressService])
], ReportListComponent);
exports.ReportListComponent = ReportListComponent;
//# sourceMappingURL=report-list-component.js.map