export class User {
  static exampleData: User[] = [
    {
      firstName: 'Christopher',
      lastName: 'Anciaux',
      mail: 'christopher.anciaux@fakemail.com',
      roles: []
    },
    {
      firstName: 'Thibaut',
      lastName: 'Strecker',
      mail: 'thibaut.strecker@fakemail.com',
      roles: []
    },
    {
      firstName: 'Tao',
      lastName: 'Galasse',
      mail: 'tao.galasse@fakemail.com',
      roles: []
    }
  ];

  static roles: string[] = [
    'ROLE_REQUESTER',
    'ROLE_GROWER'
  ];

  static roleLabels: string[] = [
    'Demandeur',
    'Serriste'
  ];

  firstName: string;
  lastName: string;
  mail: string;
  roles: string[];
}
