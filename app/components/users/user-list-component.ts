import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';
import { OnInit } from '@angular/core';
import {NgProgressService} from 'ngx-progressbar';
import {Subscription} from "rxjs/Subscription";

@Component({
	selector: 'user-list',
	templateUrl: 'app/views/users/list.html',
	providers: [ UserService ]
})
export class UserListComponent implements OnInit {

	private users: User[];

	error: string;
	private subscription: Subscription;

	constructor(private userService: UserService,
				private progressService: NgProgressService) {
	}

	ngOnInit() {
		this.listAll();
	}

	listAll() {
        this.progressService.start();
        this.subscription = this.userService.listAll().subscribe(
            data => {
                this.users = data;
                this.progressService.done();
            },
            error => {
                this.error = "Could not list users";
                this.progressService.done();
            }
        );
    }

	delete(username: string) {
        this.progressService.start();
        this.subscription = this.userService.delete(username).subscribe(
			data => {
                this.progressService.done();
                this.listAll();
            },
			error => {
                this.error = "Could not delete user";
			    this.progressService.done();
			}
		);
	}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


}