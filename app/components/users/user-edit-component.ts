import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgProgressService} from 'ngx-progressbar';

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
		private userService: UserService,
        private progressService: NgProgressService) {
	}

	ngOnInit() {
		this.username = this.route.snapshot.params['username'];
		this.user = new User();
        this.progressService.start();
		this.userService.findByUsername(this.username).subscribe(
            data => {
                this.user = data;
                this.progressService.done();
            },
            error => {
                this.error = "Could not find user";
                this.progressService.done();
            }
        );
	}

	update() {
        this.progressService.start();
		this.userService.update(this.user).subscribe(
			data => {
                this.progressService.done();
                this.router.navigate(['/user-list']);
            },
            error => {
                this.error = "Could not update user";
                this.progressService.done();
            }
		);
	}
}