export class AccountRequest {
  static exampleData: AccountRequest[] = [
    {
      firstName: 'Jean-Jacques',
      lastName: 'Goldman',
      mail: 'jj.goldman@fakemail.com'
    },
    {
      firstName: 'Alain',
      lastName: 'Souchon',
      mail: 'alain.souchon@fakemail.com'
    },
    {
      firstName: 'Eddy',
      lastName: 'Mitchell',
      mail: 'eddy.michmich@fakemail.com'
    }
  ];

  firstName: string;
  lastName: string;
  mail: string;
  description?: string;
}
