import { Routes } from "@angular/router";
import { PostRoutes } from "./components/posts/post-routes.component";

export const APP_ROUTES: Routes = [
	...PostRoutes
];