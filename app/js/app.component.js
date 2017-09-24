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
var AppComponent = AppComponent_1 = (function () {
    function AppComponent(signinService, router) {
        this.signinService = signinService;
        this.router = router;
        // this.signinService.loggedUser.subscribe(
        //   value => {
        //     this.loggedUsername = value;
        //     console.log("loggedUser changed: " + value);
        //   }, error => console.log("error")
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
        this.router.navigate(['/postList']);
    };
    AppComponent.prototype.userIsAdmin = function () {
        if (sessionStorage['permissionid'] == "3")
            return true;
        return false;
    };
    return AppComponent;
}());
AppComponent = AppComponent_1 = __decorate([
    core_1.Component({
        selector: 'meu-app',
        templateUrl: 'app/menu.html',
        providers: [signin_service_1.SigninService],
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [signin_service_1.SigninService, router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
var AppComponent_1;
//# sourceMappingURL=app.component.js.map