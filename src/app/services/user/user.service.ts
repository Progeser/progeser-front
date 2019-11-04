import { Injectable } from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected loggedUser: User = User.exampleData[0];

  constructor(protected router: Router) { }

  get user(): User {
    return this.loggedUser;
  }

  isUserLoggedIn(): boolean {
    return null !== this.user;
  }

  hasRole(role: string): boolean {
    return this.isUserLoggedIn() && this.user.roles.includes(role);
  }

  login() {
    this.loggedUser = User.exampleData[0];

    this.router.navigate(['/common-home']);
  }

  logout() {
    this.loggedUser = null;

    this.router.navigate(['/common-home']);
  }
}
