import {Resource} from './resource';

export class User extends Resource {
  static roles: string[] = [
    'requester',
    'grower'
  ];

  static roleLabels: string[] = [
    'words.requester',
    'words.grower'
  ];

  static exampleData: User[] = [
    {
      id: 1,
      firstName: 'Christopher',
      lastName: 'Anciaux',
      email: 'christopher.anciaux@fakemail.com',
      role: User.roles[1]
    },
    {
      id: 2,
      firstName: 'Thibaut',
      lastName: 'Strecker',
      email: 'thibaut.strecker@fakemail.com',
      role: User.roles[1]
    },
    {
      id: 3,
      firstName: 'Tao',
      lastName: 'Galasse',
      email: 'tao.galasse@fakemail.com',
      role: User.roles[2]
    }
  ];

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  validUntil?: Date;
  lab?: string;
  responsible?: User | string;

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
}
