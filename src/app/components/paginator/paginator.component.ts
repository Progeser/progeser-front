import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map, startWith, switchMap, tap} from 'rxjs/operators';
import {PaginatedResource} from '../../utils/paginator/paginated-resource';
import {ResourceService} from '../../services/http/resource/resource.service';
import {Resource} from '../../models';
import {PaginatorParamsBuilder} from '../../utils/paginator/paginator-params-builder';

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

  @Input()
  filters: object;

  @Output()
  pageChange: Observable<PaginatedResource<ItemsType>>;

  ngOnInit() {
    this.pageChange = this.paginator.page.pipe(
      startWith({}),
      switchMap(() => this.getPageResults()),
      tap(paginatedResourceObject => this.length = paginatedResourceObject.totalItems)
    );
  }

  getPageResults(): Observable<PaginatedResource<ItemsType>> {
    const paginatorParamsBuilder = new PaginatorParamsBuilder();
    paginatorParamsBuilder.page = this.paginator.pageIndex + 1;
    paginatorParamsBuilder.itemsPerPage = this.paginator.pageSize;
    paginatorParamsBuilder.filters = this.filters;

    return this.fetcher.find(...[paginatorParamsBuilder.getPaginatorParams(), ...this.fetcherArguments]).pipe(
      map(resource => resource as PaginatedResource<ItemsType>)
    );
  }
}
