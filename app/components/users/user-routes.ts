import { Routes } from '@angular/router';
import { UserListComponent } from './user-list-component';
import { UserEditComponent } from './user-edit-component';
import { UserViewComponent } from './user-view-component';
import { AuthGuard } from '../../auth-guard';

export const UserRoutes: Routes = [
	{ 
		path: 'user-list', 
		component: UserListComponent, 
		canActivate: [ AuthGuard ] 
	}, 

	{ 
		path: 'user-edit/:username',
		component: UserEditComponent, 
		canActivate: [ AuthGuard ] 
	},
	{ 
		path: 'user-view/:username',
		component: UserViewComponent, 
		canActivate: [ AuthGuard ] 
	}
];