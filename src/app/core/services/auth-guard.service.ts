import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public userService: UserService,
              public router: Router) {
  }

  canActivate(): boolean {
    if (this.userService.isGuest.getValue()) {
      this.router.navigate(['sign-in']);
      return false;
    }
    return true;
  }
}
