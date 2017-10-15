import { Routes } from "@angular/router";
import { NewPostComponent } from "./new-post-component";
import { PostListComponent } from "./post-list-component";
import { AuthGuard } from "../../auth-guard";
import { PostDetailComponent } from "./post-detail-component";
import { ReportListComponent } from "./report-list-component";

export const PostRoutes: Routes = [
	{
		path: 'new-post',
		component: NewPostComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'post-list',
		component: PostListComponent
	},
	{
		path: 'post/:id',
		component: PostDetailComponent
	},
	{
		path: 'report-list',
		component: ReportListComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '',
		redirectTo: '/post-list',
		pathMatch: 'full'
	}
];