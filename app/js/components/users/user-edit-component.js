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
var user_1 = require("../../models/user");
var user_service_1 = require("../../services/user-service");
var router_1 = require("@angular/router");
var ngx_progressbar_1 = require("ngx-progressbar");
var UserEditComponent = (function () {
    function UserEditComponent(route, router, userService, progressService) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.progressService = progressService;
    }
    UserEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.username = this.route.snapshot.params['username'];
        this.user = new user_1.User();
        this.progressService.start();
        this.userService.findByUsername(this.username).subscribe(function (data) {
            _this.user = data;
            _this.progressService.done();
        }, function (error) {
            _this.error = "Could not find user";
            _this.progressService.done();
        });
    };
    UserEditComponent.prototype.update = function () {
        var _this = this;
        this.progressService.start();
        this.userService.update(this.user).subscribe(function (data) {
            _this.progressService.done();
            _this.router.navigate(['/user-list']);
        }, function (error) {
            _this.error = "Could not update user";
            _this.progressService.done();
        });
    };
    return UserEditComponent;
}());
UserEditComponent = __decorate([
    core_1.Component({
        selector: 'user-edit',
        templateUrl: 'app/views/users/edit.html',
        providers: [user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        user_service_1.UserService,
        ngx_progressbar_1.NgProgressService])
], UserEditComponent);
exports.UserEditComponent = UserEditComponent;
//# sourceMappingURL=user-edit-component.js.map