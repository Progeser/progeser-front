import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {UserService} from '../user/user.service';

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
      && !route.data.roles.some(role => this.userService.user.role === role)) {
      this.router.navigate(['/home']);

      return false;
    }

    return true;
  }
}
