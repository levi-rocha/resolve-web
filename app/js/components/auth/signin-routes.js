"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signin_component_1 = require("./signin-component");
var auth_guard_1 = require("../../auth-guard");
var signin_service_1 = require("../../services/signin-service");
exports.SigninRoutes = [
    { path: 'signIn', component: signin_component_1.SigninComponent },
    { path: 'signOut', component: signin_component_1.SigninComponent }
];
exports.AUTH_PROVIDERS = [auth_guard_1.AuthGuard, signin_service_1.SigninService];
//# sourceMappingURL=signin-routes.js.map