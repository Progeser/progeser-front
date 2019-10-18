import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {Request} from '../../models';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {
  @Input()
  columns: string[];

  @Input()
  numberItemsPerPage = 10;

  @Input()
  requests: Request[] = [];

  @ViewChild(MatPaginator, {static: false})
  protected paginator: MatPaginator;

  constructor() {
  }

  ngOnInit() {
  }

  getLimitedRequests() {
    const startIndex = this.paginator ? this.paginator.pageIndex * this.numberItemsPerPage : 0;

    return this.requests.slice(startIndex, startIndex + this.numberItemsPerPage);
  }
}
