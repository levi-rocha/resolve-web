import { CanActivate }    from '@angular/router';
import { Injectable } from '@angular/core';
import { SigninService } from './services/signin-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  
	constructor(private signinService: SigninService, private router: Router){
	}

  	canActivate() {
  		if (SigninService.signedIn()) {
  			return true;
  		}
  		this.router.navigate(['/signIn']);
  	}
}