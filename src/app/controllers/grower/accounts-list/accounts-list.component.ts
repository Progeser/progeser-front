import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {User} from '../../../models/user';
import {AccountRequest} from '../../../models/account-request';
import {AccountRequestService, InviteService, SnackbarService} from '../../../services';
import {PaginatedResource} from '../../../utils/paginator/paginated-resource';
import {PaginatorComponent} from '../../../components/paginator/paginator.component';
import {Invite} from '../../../models/invite';
import {UserService} from '../../../services/http/user/user.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements AfterViewInit {
  getRoleLabel = User.getRoleLabel;

  usersColumns: string[] = ['firstName', 'lastName', 'role', 'actions'];
  users: PaginatedResource<User>;

  accountRequestsColumns: string[] = ['firstName', 'lastName', 'actions'];
  accountRequests?: PaginatedResource<AccountRequest> = null;

  invitesColumns: string[] = ['firstName', 'lastName', 'actions'];
  invites?: PaginatedResource<Invite> = null;

  @ViewChild('usersPaginator', {static: true})
  usersPaginator: PaginatorComponent<User>;

  @ViewChild('accountRequestsPaginator', {static: true})
  accountRequestsPaginator: PaginatorComponent<AccountRequest>;

  @ViewChild('invitesPaginator', {static: true})
  invitesPaginator: PaginatorComponent<Invite>;

  constructor(protected snackbarService: SnackbarService,
              protected httpAccountRequestService: AccountRequestService,
              protected httpInviteService: InviteService,
              protected httpUserService: UserService) {
  }

  ngAfterViewInit() {
    this.usersPaginator.pageChange.subscribe({
      next: users => this.users = users
    });

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
