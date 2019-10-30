import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../services';
import {BreadCrumb} from '../../services/breadcrumb/breadcrumb';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  breadcrumbs: BreadCrumb[];
  breadcrumbSubscription: Subscription;

  constructor(protected breadcrumbService: BreadcrumbService) {
  }

  ngOnInit() {
    this.breadcrumbSubscription = this.breadcrumbService.breadcrumbEvent.subscribe({
      next: breadcrumbs => this.breadcrumbs = breadcrumbs
    });
  }

  ngOnDestroy(): void {
    this.breadcrumbSubscription.unsubscribe();
  }
}
