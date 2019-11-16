import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';
import {AccountRequest} from '../../../models/account-request';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {
  getRolesLabel = User.getRolesLabel;

  usersColumns: string[] = ['firstName', 'lastName', 'role', 'actions'];
  users: User[] = [];

  accountRequestsColumns: string[] = ['firstName', 'lastName', 'actions'];
  accountRequests: AccountRequest[] = [];

  numberItemsPerPage = 10;

  constructor() { }

  ngOnInit() {
    this.users = User.exampleData;
    this.accountRequests = AccountRequest.exampleData;
  }

}
