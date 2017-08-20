"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_list_component_1 = require("./user-list-component");
var user_signup_component_1 = require("./user-signup-component");
var user_edit_component_1 = require("./user-edit-component");
var user_view_component_1 = require("./user-view-component");
var auth_guard_1 = require("../../auth-guard");
exports.UserRoutes = [
    {
        path: 'user-list',
        component: user_list_component_1.UserListComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'user-signup',
        component: user_signup_component_1.UserSignupComponent
    },
    {
        path: 'user-edit/:username',
        component: user_edit_component_1.UserEditComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'user-view/:username',
        component: user_view_component_1.UserViewComponent,
        canActivate: [auth_guard_1.AuthGuard]
    }
];
//# sourceMappingURL=user-routes.js.map