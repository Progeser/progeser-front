import {Resource} from './resource';

export class AccountRequest extends Resource {
  static exampleData: AccountRequest[] = [
    {
      id: 1,
      firstName: 'Jean-Jacques',
      lastName: 'Goldman',
      email: 'jj.goldman@fakemail.com'
    },
    {
      id: 2,
      firstName: 'Alain',
      lastName: 'Souchon',
      email: 'alain.souchon@fakemail.com'
    },
    {
      id: 3,
      firstName: 'Eddy',
      lastName: 'Mitchell',
      email: 'eddy.michmich@fakemail.com'
    }
  ];

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  comment?: string;
  accepted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
