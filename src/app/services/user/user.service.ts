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

  login() {
    this.user = User.exampleData[0];
  }

  logout() {
    this.user = null;
  }
}
