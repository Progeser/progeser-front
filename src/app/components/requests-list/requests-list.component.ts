import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Request} from '../../models';
import {TranslateService} from '@ngx-translate/core';
import {RequestService} from '../../services/http';
import {PaginatedResource} from '../../utils/paginator/paginated-resource';
import {PaginatorComponent} from '../paginator/paginator.component';
import {isNullOrUndefined} from 'util';
import {UserService} from '../../services';
import {User} from '../../models/user';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit, AfterViewInit {
  @Input()
  columns: string[];

  @Input()
  status: string;

  @ViewChild('requestsPaginator', {static: true})
  requestsPaginator: PaginatorComponent<Request>;

  requests: PaginatedResource<Request> = null;
  filters: object;

  constructor(protected translateService: TranslateService,
              protected userService: UserService,
              protected httpRequestService: RequestService) {
  }

  ngOnInit(): void {
    this.buildFilters();
  }

  ngAfterViewInit() {
    this.requestsPaginator.pageChange.subscribe({
      next: requests => this.requests = requests
    });
  }

  acceptRequest(request: Request) {
    this.httpRequestService.accept(request.id).subscribe();
  }

  rejectRequest(request: Request) {
    this.httpRequestService.reject(request.id).subscribe();
  }

  cancelRequest(request: Request) {
    this.httpRequestService.cancel(request.id).subscribe();
  }

  deleteRequest(request: Request) {
    this.httpRequestService.delete(request.id).subscribe();
  }

  protected buildFilters() {
    if (isNullOrUndefined(this.status)) {
      this.filters = null;

      return;
    }

    this.filters = {
      status: this.status
    };
  }

  userIsGrower(): boolean {
    return this.userService.hasRole(User.roles[1]);
  }
}
