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
var user_service_1 = require("../../services/user-service");
var ngx_progressbar_1 = require("ngx-progressbar");
var UserListComponent = (function () {
    function UserListComponent(userService, progressService) {
        this.userService = userService;
        this.progressService = progressService;
    }
    UserListComponent.prototype.ngOnInit = function () {
        this.listAll();
    };
    UserListComponent.prototype.listAll = function () {
        var _this = this;
        this.progressService.start();
        this.subscription = this.userService.listAll().subscribe(function (data) {
            _this.users = data;
            _this.progressService.done();
        }, function (error) {
            _this.error = "Could not list users";
            _this.progressService.done();
        });
    };
    UserListComponent.prototype.delete = function (username) {
        var _this = this;
        this.progressService.start();
        this.subscription = this.userService.delete(username).subscribe(function (data) {
            _this.progressService.done();
            _this.listAll();
        }, function (error) {
            _this.error = "Could not delete user";
            _this.progressService.done();
        });
    };
    UserListComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return UserListComponent;
}());
UserListComponent = __decorate([
    core_1.Component({
        selector: 'user-list',
        templateUrl: 'app/views/users/list.html',
        providers: [user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        ngx_progressbar_1.NgProgressService])
], UserListComponent);
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list-component.js.map