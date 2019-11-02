import { Injectable } from '@angular/core';
import {User} from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected loggedUser: User = User.exampleData[0];

  constructor() { }

  get user(): User {
    return this.loggedUser;
  }

  set user(user: User) {
    this.loggedUser = user;
  }

  isUserLoggedIn(): boolean {
    return null !== this.user;
  }

  hasRole(role: string): boolean {
    return this.isUserLoggedIn() && this.user.roles.includes(role);
  }

  login() {
    this.user = User.exampleData[0];
  }

  logout() {
    this.user = null;
  }
}
