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
var router_1 = require("@angular/router");
var signin_service_1 = require("../../services/signin-service");
var material_1 = require("@angular/material");
var SigninComponent = (function () {
    function SigninComponent(router, signinService, snackBar) {
        var _this = this;
        this.router = router;
        this.signinService = signinService;
        this.snackBar = snackBar;
        this.gClientID = "1088160350239-qdg3e6j7jtlprpnukkuet4et5h3oj4j3.apps.googleusercontent.com";
        this.signinService.loggedUser.subscribe(function (value) {
            console.log(value);
            if (value != "") {
                _this.router.navigate(['']);
            }
        }, function (error) {
            _this.error = "Could not log in";
            _this.snackBar.open("Falha ao efetuar login", "OK");
        });
    }
    SigninComponent.prototype.signIn = function () {
        var _this = this;
        this.signinService.signIn(this.username, this.password).subscribe(function (user) {
            if (user != null) {
                sessionStorage['username'] = user.username;
                sessionStorage['userid'] = user.id;
                sessionStorage['permissionid'] = user.permission.id;
                _this.router.navigate(['']);
            }
        }, function (error) {
            _this.snackBar.open("Erro: " + error, "OK");
        });
    };
    SigninComponent.prototype.googleInit = function () {
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
    SigninComponent.prototype.attachSignin = function (element) {
        this.auth2.attachClickHandler(element, {}, function (googleUser) {
            var profile = googleUser.getBasicProfile();
            console.log('Token || ' + googleUser.getAuthResponse().id_token);
            console.log('ID: ' + profile.getId());
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
            //TODO: criar user
        }, function (error) {
            alert(JSON.stringify(error, undefined, 2));
        });
    };
    SigninComponent.prototype.ngAfterViewInit = function () {
        this.googleInit();
    };
    return SigninComponent;
}());
SigninComponent = __decorate([
    core_1.Component({
        selector: 'signIn',
        templateUrl: 'app/views/signin.html',
        providers: [signin_service_1.SigninService, material_1.MdSnackBar]
    }),
    __metadata("design:paramtypes", [router_1.Router, signin_service_1.SigninService, material_1.MdSnackBar])
], SigninComponent);
exports.SigninComponent = SigninComponent;
//# sourceMappingURL=signin-component.js.map