import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {startWith, switchMap, tap} from 'rxjs/operators';
import {PaginatedResource} from '../../models/paginated-resource';
import {ResourceService} from '../../services/http/resource/resource.service';
import {Resource} from '../../models';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss']
})
export class TablePaginatorComponent<ItemsType extends Resource> implements OnInit {
  numberItemsPerPage = environment.numberOfItemsPerPage;
  allowedNumberItemsPerPage = environment.allowedNumberOfItemsPerPage;

  @ViewChild('paginator', {static: true})
  paginator: MatPaginator;

  @Input()
  length = 0;

  @Input()
  fetcher: ResourceService<ItemsType>;

  @Output()
  pageChange: Observable<PaginatedResource<ItemsType>>;

  ngOnInit() {
    this.pageChange = this.paginator.page.pipe(
      startWith({}),
      switchMap(() => this.fetcher.find(this.paginator.pageIndex + 1, this.paginator.pageSize)),
      tap(paginatedResourceObject => this.length = paginatedResourceObject.totalItems)
    );
  }
}
