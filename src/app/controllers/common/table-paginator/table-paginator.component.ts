import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss']
})
export class TablePaginatorComponent implements OnInit {
  numberItemsPerPage = environment.numberOfItemsPerPage;
  allowedNumberItemsPerPage = environment.allowedNumberOfItemsPerPage;

  @ViewChild('paginator', {static: true})
  paginator: MatPaginator;

  @Input()
  length: number;

  @Output()
  pageChange: EventEmitter<PageEvent>;

  ngOnInit() {
    this.pageChange = this.paginator.page;
  }
}
