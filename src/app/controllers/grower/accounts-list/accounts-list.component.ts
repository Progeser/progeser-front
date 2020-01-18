import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {User} from '../../../models/user';
import {AccountRequest} from '../../../models/account-request';
import {AccountRequestService, InviteService, SnackbarService} from '../../../services';
import {PaginatedResource} from '../../../models/paginated-resource';
import {TablePaginatorComponent} from '../../../components/table-paginator/table-paginator.component';
import {Invite} from '../../../models/invite';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements AfterViewInit {
  getRoleLabel = User.getRoleLabel;

  usersColumns: string[] = ['firstName', 'lastName', 'role', 'actions'];
  users: User[] = User.exampleData;

  accountRequestsColumns: string[] = ['firstName', 'lastName', 'actions'];
  accountRequests?: PaginatedResource<AccountRequest> = null;

  invitesColumns: string[] = ['firstName', 'lastName', 'actions'];
  invites?: PaginatedResource<Invite> = null;

  @ViewChild('accountRequestsPaginator', {static: true})
  accountRequestsPaginator: TablePaginatorComponent<AccountRequest>;

  @ViewChild('invitesPaginator', {static: true})
  invitesPaginator: TablePaginatorComponent<Invite>;

  constructor(protected snackbarService: SnackbarService,
              protected httpAccountRequestService: AccountRequestService,
              protected httpInviteService: InviteService) {
  }

  ngAfterViewInit() {
    // todo: list non-accepted requests only
    this.accountRequestsPaginator.pageChange.subscribe({
      next: accountRequests => this.accountRequests = accountRequests
    });

    this.invitesPaginator.pageChange.subscribe({
      next: invites => this.invites = invites
    });
  }

  handleAccountRequest(accountRequestId: number, accountRequestIndex: number, accept: boolean) {
    this.httpAccountRequestService.handleAccountRequest(accountRequestId, accept).subscribe({
      next: () => this.accountRequests.removeItemByIndex(accountRequestIndex)
    });
  }

  cancelInvite(inviteId: number, inviteIndex: number) {
    this.httpInviteService.delete(inviteId).subscribe({
      next: () => this.invites.removeItemByIndex(inviteIndex)
    });
  }
}
