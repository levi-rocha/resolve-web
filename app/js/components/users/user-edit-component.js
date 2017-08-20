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
var UserEditComponent = (function () {
    function UserEditComponent(route, router, userService) {
        this.route = route;
        this.router = router;
        this.userService = userService;
    }
    UserEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.username = this.route.snapshot.params['username'];
        this.user = new user_1.User();
        this.userService.findByUsername(this.username).subscribe(function (data) { return _this.user = data; }, function (error) { return _this.error = "Could not find user"; });
    };
    UserEditComponent.prototype.update = function () {
        var _this = this;
        this.userService.update(this.user).subscribe(function (data) { return _this.router.navigate(['/user-list']); }, function (error) { return _this.error = "Could not update user"; });
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
        user_service_1.UserService])
], UserEditComponent);
exports.UserEditComponent = UserEditComponent;
//# sourceMappingURL=user-edit-component.js.map