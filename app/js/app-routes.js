"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_routes_1 = require("./components/users/user-routes");
var signin_routes_1 = require("./components/auth/signin-routes");
var post_routes_1 = require("./components/posts/post-routes");
exports.APP_ROUTES = user_routes_1.UserRoutes.concat(signin_routes_1.SigninRoutes, post_routes_1.PostRoutes);
//# sourceMappingURL=app-routes.js.map