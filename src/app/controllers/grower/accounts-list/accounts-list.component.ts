import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {User} from '../../../models/user';
import {AccountRequest} from '../../../models/account-request';
import {AccountRequestService, SnackbarService} from '../../../services';
import {PaginatedResource} from '../../../models/paginated-resource';
import {TablePaginatorComponent} from '../../common/table-paginator/table-paginator.component';
import {startWith, switchMap} from 'rxjs/operators';

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

  @ViewChild('accountRequestsPaginator', {static: true})
  accountRequestsPaginator: TablePaginatorComponent;

  constructor(protected snackbarService: SnackbarService,
              protected httpAccountRequestService: AccountRequestService) {
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
  }

}
