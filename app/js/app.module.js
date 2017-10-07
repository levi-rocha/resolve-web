"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var app_routes_1 = require("./app-routes");
var signin_routes_1 = require("./components/auth/signin-routes");
var router_1 = require("@angular/router");
var user_list_component_1 = require("./components/users/user-list-component");
var new_post_component_1 = require("./components/posts/new-post-component");
var user_signup_component_1 = require("./components/users/user-signup-component");
var user_edit_component_1 = require("./components/users/user-edit-component");
var user_view_component_1 = require("./components/users/user-view-component");
var signin_component_1 = require("./components/auth/signin-component");
var post_list_component_1 = require("./components/posts/post-list-component");
var post_detail_component_1 = require("./components/posts/post-detail-component");
var report_list_component_1 = require("./components/posts/report-list-component");
var auth_guard_1 = require("./auth-guard");
var signin_service_1 = require("./services/signin-service");
var material_1 = require("@angular/material");
var animations_1 = require("@angular/platform-browser/animations");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            router_1.RouterModule.forRoot(app_routes_1.APP_ROUTES, signin_routes_1.AUTH_PROVIDERS),
            forms_1.FormsModule,
            http_1.HttpModule,
            material_1.MdButtonModule,
            material_1.MdSidenavModule,
            material_1.MdToolbarModule,
            material_1.MdCardModule,
            material_1.MdInputModule,
            animations_1.BrowserAnimationsModule,
            material_1.MdSnackBarModule,
            material_1.MdMenuModule,
            material_1.MdProgressBarModule,
            material_1.MdListModule,
            material_1.MdTabsModule,
            material_1.MdIconModule,
            material_1.MdSelectModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            user_list_component_1.UserListComponent,
            user_signup_component_1.UserSignupComponent,
            user_edit_component_1.UserEditComponent,
            user_view_component_1.UserViewComponent,
            signin_component_1.SigninComponent,
            new_post_component_1.NewPostComponent,
            post_list_component_1.PostListComponent,
            post_detail_component_1.PostDetailComponent,
            report_list_component_1.ReportListComponent
        ],
        providers: [auth_guard_1.AuthGuard, signin_service_1.SigninService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map