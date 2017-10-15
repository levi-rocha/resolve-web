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
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var user_1 = require("../../models/user");
var user_service_1 = require("../../services/user-service");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var permission_1 = require("../../models/permission");
var ngx_progressbar_1 = require("ngx-progressbar");
var UserSignupComponent = (function () {
    function UserSignupComponent(_location, router, userService, snackBar, progressService) {
        this._location = _location;
        this.router = router;
        this.userService = userService;
        this.snackBar = snackBar;
        this.progressService = progressService;
        this.gClientID = "1088160350239-qdg3e6j7jtlprpnukkuet4et5h3oj4j3.apps.googleusercontent.com";
    }
    UserSignupComponent.prototype.goBack = function () {
        this._location.back();
    };
    UserSignupComponent.prototype.ngOnInit = function () {
        this.user = new user_1.User();
        this.usernameTaken = false;
        this.permissions = [
            new permission_1.Permission(1, "standard"),
            new permission_1.Permission(2, "professional"),
        ];
    };
    UserSignupComponent.prototype.signUp = function () {
        this.signUserUp(this.user);
    };
    UserSignupComponent.prototype.onBlur = function () {
        var _this = this;
        this.progressService.start();
        this.userService.findByUsername(this.user.username).subscribe(function (data) {
            _this.usernameTaken = true;
            _this.progressService.done();
        }, function (error) {
            _this.usernameTaken = false;
            _this.progressService.done();
        });
    };
    UserSignupComponent.prototype.googleInit = function () {
        var _this = this;
        gapi.load('auth2', function () {
            _this.auth2 = gapi.auth2.init({
                client_id: _this.gClientID,
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });
            _this.attachSignin(document.getElementById('googleBtn'));
        });
    };
    UserSignupComponent.prototype.attachSignin = function (element) {
        var _this = this;
        this.auth2.attachClickHandler(element, {}, function (googleUser) {
            var profile = googleUser.getBasicProfile();
            var newUser = new user_1.User();
            newUser.username = profile.getName();
            newUser.email = profile.getEmail();
            newUser.password = profile.getId();
            newUser.permission = new permission_1.Permission(1);
            _this.signUserUp(newUser);
        }, function (error) {
            alert(JSON.stringify(error, undefined, 2));
        });
    };
    UserSignupComponent.prototype.signUserUp = function (user) {
        var _this = this;
        this.progressService.start();
        this.userService.insert(user).subscribe(function (data) {
            _this.snackBar.open("Usuario cadastrado com suceso", "OK");
            _this.progressService.done();
            _this.router.navigate(['/post-list']);
        }, function (error) {
            _this.snackBar.open("Erro: " + error._body, "OK");
            _this.progressService.done();
        });
    };
    UserSignupComponent.prototype.ngAfterViewInit = function () {
        this.googleInit();
    };
    return UserSignupComponent;
}());
UserSignupComponent = __decorate([
    core_1.Component({
        selector: 'user-signup',
        templateUrl: 'app/views/users/signup.html',
        providers: [user_service_1.UserService]
    }),
    __metadata("design:paramtypes", [common_1.Location,
        router_1.Router,
        user_service_1.UserService,
        material_1.MdSnackBar,
        ngx_progressbar_1.NgProgressService])
], UserSignupComponent);
exports.UserSignupComponent = UserSignupComponent;
//# sourceMappingURL=user-signup-component.js.map