import {Injectable} from '@angular/core';
import {UserService} from '../user/user.service';
import {Checkers} from './checkers/checkers';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(protected userService: UserService) {
  }

  hasPermission(permissionName: string, resource?: object) {
    return Checkers.hasChecker(permissionName) && Checkers.availableCheckers[permissionName](this.userService.user, resource);
  }

  isGrower() {
    return this.userService.user.isGrower();
  }

  isRequester() {
    return this.userService.user.isRequester();
  }
}
