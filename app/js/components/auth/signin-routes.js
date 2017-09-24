"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signin_component_1 = require("./signin-component");
var auth_guard_1 = require("../../auth-guard");
var signin_service_1 = require("../../services/signin-service");
var post_list_component_1 = require("../posts/post-list-component");
exports.SigninRoutes = [
    { path: 'signIn', component: signin_component_1.SigninComponent },
    { path: 'signOut', component: signin_component_1.SigninComponent },
    { path: 'postList', component: post_list_component_1.PostListComponent }
];
exports.AUTH_PROVIDERS = [auth_guard_1.AuthGuard, signin_service_1.SigninService];
//# sourceMappingURL=signin-routes.js.map