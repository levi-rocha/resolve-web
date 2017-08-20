import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'user-edit',
	templateUrl: 'app/views/users/edit.html',
	providers: [ UserService ]
})
export class UserEditComponent implements OnInit {

	private username: string;
	private user: User;

	error: string;

	constructor(
		private route: ActivatedRoute, 
		private router: Router, 
		private userService: UserService) {
	}

	ngOnInit() {
		this.username = this.route.snapshot.params['username'];
		this.user = new User();
		this.userService.findByUsername(this.username).subscribe(
            data => this.user = data,
            error => this.error = "Could not find user"
        );
	}

	update() {
		this.userService.update(this.user).subscribe(
			data => this.router.navigate(['/user-list']),
            error => this.error = "Could not update user"
		);
	}
}