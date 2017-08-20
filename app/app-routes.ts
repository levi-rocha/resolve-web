import {Routes} from "@angular/router";
import {UserRoutes} from "./components/users/user-routes";
import {SigninRoutes} from "./components/auth/signin-routes";
import {PostRoutes} from "./components/posts/post-routes";

export const APP_ROUTES: Routes = [
	...UserRoutes,
	...SigninRoutes,
	...PostRoutes
];