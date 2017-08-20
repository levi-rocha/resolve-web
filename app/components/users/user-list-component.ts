import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';
import { OnInit } from '@angular/core';

@Component({
	selector: 'user-list',
	templateUrl: 'app/views/users/list.html',
	providers: [ UserService ]
})
export class UserListComponent implements OnInit {

	private users: User[];

	error: string;

	constructor(private userService: UserService) {
	}

	ngOnInit() {
		this.listAll();
	}

	listAll() {
        this.userService.listAll().subscribe(
            data => this.users = data,
            error => this.error = "Could not list users"
        );
    }

	delete(username: string) {
		this.userService.delete(username).subscribe(
			data => this.listAll(),
			error => this.error = "Could not delete user"
		);
	}
}