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
var ngx_progressbar_1 = require("ngx-progressbar");
var SigninComponent = (function () {
    function SigninComponent(router, signinService, snackBar, progressService) {
        var _this = this;
        this.router = router;
        this.signinService = signinService;
        this.snackBar = snackBar;
        this.progressService = progressService;
        this.gClientID = "1088160350239-qdg3e6j7jtlprpnukkuet4et5h3oj4j3.apps.googleusercontent.com";
        this.progressService.start();
        this.signinService.loggedUser.subscribe(function (value) {
            _this.progressService.done();
            if (value != "") {
                _this.router.navigate(['']);
            }
        }, function (error) {
            _this.error = "Could not log in";
            _this.snackBar.open("Falha ao efetuar login", "OK");
            _this.progressService.done();
        });
    }
    SigninComponent.prototype.signIn = function () {
        this.signUserIn(this.username, this.password);
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
        var _this = this;
        this.auth2.attachClickHandler(element, {}, function (googleUser) {
            //TODO: verificar se cadastrado: se não, cadastrar.
            var profile = googleUser.getBasicProfile();
<<<<<<< HEAD
            console.log('Token || ' + googleUser.getAuthResponse().id_token);
            console.log('ID: ' + profile.getId());
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
            //TODO: verificar se cadastrado: se não, cadastrar. se sim, logar.
=======
            var username = profile.getName();
            var password = profile.getId();
            _this.signUserIn(username, password);
>>>>>>> loading implementado
        }, function (error) {
            alert(JSON.stringify(error, undefined, 2));
        });
    };
    SigninComponent.prototype.signUserIn = function (username, passsword) {
        var _this = this;
        this.progressService.start();
        this.signinService.signIn(username, passsword).subscribe(function (user) {
            _this.progressService.done();
            if (user != null) {
                sessionStorage['username'] = user.username;
                sessionStorage['userid'] = user.id;
                sessionStorage['permissionid'] = user.permission.id;
                _this.router.navigate(['']);
            }
        }, function (error) {
            _this.progressService.done();
            _this.snackBar.open("Erro: " + error, "OK");
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
    __metadata("design:paramtypes", [router_1.Router,
        signin_service_1.SigninService,
        material_1.MdSnackBar,
        ngx_progressbar_1.NgProgressService])
], SigninComponent);
exports.SigninComponent = SigninComponent;
//# sourceMappingURL=signin-component.js.map