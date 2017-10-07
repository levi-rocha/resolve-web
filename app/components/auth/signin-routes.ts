import { Routes } from '@angular/router';
import { SigninComponent } from './signin-component';
import { AuthGuard } from '../../auth-guard';
import { SigninService } from '../../services/signin-service';
import {PostListComponent} from "../posts/post-list-component";

export const SigninRoutes: Routes = [
	{ path: 'signIn', component: SigninComponent },
	{ path: 'signOut', component: SigninComponent },
	{ path: 'postList', component: PostListComponent}
];

export const AUTH_PROVIDERS = [ AuthGuard, SigninService ];