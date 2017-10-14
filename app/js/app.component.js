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
var signin_service_1 = require("./services/signin-service");
var router_1 = require("@angular/router");
var user_1 = require("./models/user");
var user_service_1 = require("./services/user-service");
var material_1 = require("@angular/material");
var permission_1 = require("./models/permission");
var common_1 = require("@angular/common");
var ngx_progressbar_1 = require("ngx-progressbar");
var AppComponent = AppComponent_1 = (function () {
    function AppComponent(signinService, router, _location, userService, snackBar, progressService) {
        this.signinService = signinService;
        this.router = router;
        this._location = _location;
        this.userService = userService;
        this.snackBar = snackBar;
        this.progressService = progressService;
        this.gClientID = "1088160350239-qdg3e6j7jtlprpnukkuet4et5h3oj4j3.apps.googleusercontent.com";
        // this.signinService.loggedUser.subscribe(
        //     value => {
        //         console.log(value);
        //         if (value != "") {
        //             this.router.navigate(['']);
        //         }
        //     },
        //     error => {
        //         this.error = "Could not log in";
        //         this.snackBar.open("Falha ao efetuar login", "OK");
        //     }
        // );
    }
    AppComponent.isLogged = function () {
        return sessionStorage['username'] != null;
    };
    AppComponent.prototype.isLogged = function () {
        return AppComponent_1.isLogged();
    };
    AppComponent.loggedUsername = function () {
        return sessionStorage['username'] || '';
    };
    AppComponent.prototype.loggedUsername = function () {
        return AppComponent_1.loggedUsername();
    };
    AppComponent.prototype.signOut = function () {
        sessionStorage.clear();
        this.router.navigate(['/post-list']);
    };
    AppComponent.prototype.userIsAdmin = function () {
        if (sessionStorage['permissionid'] == "3")
            return true;
        return false;
    };
    AppComponent.prototype.goBack = function () {
        this._location.back();
    };
    AppComponent.prototype.ngOnInit = function () {
        this.user = new user_1.User();
        this.usernameTaken = false;
        this.permissions = [
            new permission_1.Permission(1, "standard"),
            new permission_1.Permission(2, "professional"),
        ];
    };
    AppComponent.prototype.signIn = function () {
        this.signUserIn(this.username, this.password);
    };
    AppComponent.prototype.googleInit = function () {
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
    AppComponent.prototype.attachSignin = function (element) {
        var _this = this;
        this.auth2.attachClickHandler(element, {}, function (googleUser) {
            //TODO: verificar se cadastrado: se não, cadastrar.
            var profile = googleUser.getBasicProfile();
            var username = profile.getName();
            var password = profile.getId();
            _this.signUserIn(username, password);
        }, function (error) {
            alert(JSON.stringify(error, undefined, 2));
        });
    };
    AppComponent.prototype.signUserIn = function (username, passsword) {
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
    AppComponent.prototype.signUserUp = function (user) {
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
    AppComponent.prototype.ngAfterViewInit = function () {
        this.googleInit();
    };
    AppComponent.prototype.onBlur = function () {
        var _this = this;
        this.userService.findByUsername(this.user.username).subscribe(function (data) {
            _this.usernameTaken = true;
        }, function (error) {
            _this.usernameTaken = false;
        });
    };
    return AppComponent;
}());
AppComponent = AppComponent_1 = __decorate([
    core_1.Component({
        selector: 'meu-app',
        templateUrl: 'app/menu.html',
        providers: [signin_service_1.SigninService, user_service_1.UserService, material_1.MdSnackBar],
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [signin_service_1.SigninService,
        router_1.Router,
        common_1.Location,
        user_service_1.UserService,
        material_1.MdSnackBar,
        ngx_progressbar_1.NgProgressService])
], AppComponent);
exports.AppComponent = AppComponent;
var AppComponent_1;
//# sourceMappingURL=app.component.js.map