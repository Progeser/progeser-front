import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {Request} from '../../models';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {
  requestStatusLabels: string[] = Request.statusLabels;

  @Input()
  columns: string[];

  @Input()
  numberItemsPerPage = 10;

  @Input()
  requests: Request[] = [];

  @ViewChild(MatPaginator, {static: false})
  protected paginator: MatPaginator;

  constructor(protected translateService: TranslateService) {
  }

  ngOnInit() {
  }

  getLimitedRequests(): Request[] {
    const startIndex = this.paginator ? this.paginator.pageIndex * this.numberItemsPerPage : 0;

    return this.requests.slice(startIndex, startIndex + this.numberItemsPerPage);
  }
}
