"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var new_post_component_1 = require("./new-post-component");
var post_list_component_1 = require("./post-list-component");
var auth_guard_1 = require("../../auth-guard");
var post_detail_component_1 = require("./post-detail-component");
var report_list_component_1 = require("./report-list-component");
exports.PostRoutes = [
    {
        path: 'new-post',
        component: new_post_component_1.NewPostComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'post-list',
        component: post_list_component_1.PostListComponent
    },
    {
        path: 'post/:id',
        component: post_detail_component_1.PostDetailComponent
    },
    {
        path: 'report-list',
        component: report_list_component_1.ReportListComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: '',
        redirectTo: '/post-list',
        pathMatch: 'full'
    }
];
//# sourceMappingURL=post-routes.js.map