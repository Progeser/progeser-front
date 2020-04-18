import {Resource} from './resource';
import {Token} from './token';

export class User extends Resource {
  static roles: string[] = [ // todo: move in permissions
    'requester',
    'grower'
  ];

  static roleLabels: string[] = [
    'words.requester',
    'words.grower'
  ];

  static exampleData: User[] = [];

  firstName: string;
  lastName: string;
  email: string;
  role: string;
  validUntil?: Date;
  laboratory?: string;
  token?: Token; // In case the token is delivered directly when creating the account (after invite or request)

  static getRolesLabel(roles: string[]) {
    return roles
      .filter(role => User.roles.includes(role))
      .map(role => User.getRoleLabel(role))
      .join(', ');
  }

  static getRoleLabel(role: string) {
    const roleIndex = User.roles.indexOf(role);

    return -1 !== roleIndex ? User.roleLabels[User.roles.indexOf(role)] : '';
  }

  isRequester(): boolean {
    return User.roles[0] === this.role;
  }

  isGrower() {
    return User.roles[1] === this.role;
  }
}
