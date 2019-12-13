import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {User} from '../../../models/user';
import {AccountRequest} from '../../../models/account-request';
import {AccountRequestService, InviteService, SnackbarService} from '../../../services';
import {PaginatedResource} from '../../../models/paginated-resource';
import {TablePaginatorComponent} from '../../common/table-paginator/table-paginator.component';
import {startWith, switchMap} from 'rxjs/operators';
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
  accountRequestsPaginator: TablePaginatorComponent;

  @ViewChild('invitesPaginator', {static: true})
  invitesPaginator: TablePaginatorComponent;

  constructor(protected snackbarService: SnackbarService,
              protected httpAccountRequestService: AccountRequestService,
              protected httpInviteService: InviteService) {
  }

  ngAfterViewInit() {
    this.accountRequestsPaginator.pageChange.pipe(
      startWith({}),
      switchMap(() => this.httpAccountRequestService.find(
        this.accountRequestsPaginator.paginator.pageIndex + 1,
        this.accountRequestsPaginator.paginator.pageSize
      ))
    ).subscribe({
      next: accountRequests => this.accountRequests = accountRequests
    });

    this.invitesPaginator.pageChange.pipe(
      startWith({}),
      switchMap(() => this.httpInviteService.find(
        this.invitesPaginator.paginator.pageIndex + 1,
        this.invitesPaginator.paginator.pageSize
      ))
    ).subscribe({
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
