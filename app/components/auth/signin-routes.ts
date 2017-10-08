import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth-guard';
import { SigninService } from '../../services/signin-service';
import {PostListComponent} from "../posts/post-list-component";

export const SigninRoutes: Routes = [
	{ path: 'postList', component: PostListComponent}
];

export const AUTH_PROVIDERS = [ AuthGuard, SigninService ];