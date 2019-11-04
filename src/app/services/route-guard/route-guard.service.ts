import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {UserService} from '..';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(protected router: Router,
              protected userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.userService.isUserLoggedIn()) {
      this.router.navigate(['/login']);

      return false;
    }

    if (null != route.data.roles
      && !this.userService.user.roles.some(role => route.data.roles.includes(role))) {
      this.router.navigate(['/common-home']);

      return false;
    }

    return true;
  }
}
