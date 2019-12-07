import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';
import {AccountRequest} from '../../../models/account-request';
import {AccountRequestService, SnackbarService} from '../../../services';
import {PaginatedResource} from '../../../models/paginated-resource';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {
  getRoleLabel = User.getRoleLabel;

  usersColumns: string[] = ['firstName', 'lastName', 'role', 'actions'];
  users: User[] = [];

  accountRequestsColumns: string[] = ['firstName', 'lastName', 'actions'];
  accountRequests: PaginatedResource<AccountRequest> = null;

  numberItemsPerPage = 10;

  constructor(protected snackbarService: SnackbarService,
              protected httpAccountRequestService: AccountRequestService) { }

  ngOnInit() {
    this.users = User.exampleData;

    // todo: paginator + table management
    this.httpAccountRequestService.find().subscribe({
      next: accountRequests => this.accountRequests = accountRequests,
    });
  }

}
