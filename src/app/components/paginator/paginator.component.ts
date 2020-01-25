import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {startWith, switchMap, tap} from 'rxjs/operators';
import {PaginatedResource} from '../../models/paginated-resource';
import {ResourceService} from '../../services/http/resource/resource.service';
import {Resource} from '../../models';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent<ItemsType extends Resource> implements OnInit {
  numberItemsPerPage = environment.numberOfItemsPerPage;
  allowedNumberItemsPerPage = environment.allowedNumberOfItemsPerPage;

  @ViewChild('paginator', {static: true})
  paginator: MatPaginator;

  @Input()
  length = 0;

  @Input()
  fetcher: ResourceService<ItemsType>;

  @Input()
  fetcherArguments: any[] = [];

  @Output()
  pageChange: Observable<PaginatedResource<ItemsType>>;

  ngOnInit() {
    this.pageChange = this.paginator.page.pipe(
      startWith({}),
      switchMap(() => this.fetcher.find(...[this.paginator.pageIndex + 1, this.paginator.pageSize, ...this.fetcherArguments])),
      tap(paginatedResourceObject => this.length = paginatedResourceObject.totalItems)
    );
  }
}
