import {Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {BreadCrumb} from './breadcrumb';
import {Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  breadcrumbEvent: Observable<BreadCrumb[]>;

  constructor(protected activatedRoute: ActivatedRoute,
              protected router: Router) {
    this.breadcrumbEvent = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      map(event => this.buildBreadCrumb(this.activatedRoute.root))
    );
  }

  protected buildBreadCrumb(activatedRoute: ActivatedRoute, url: string = '', breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    if (!activatedRoute
      || (activatedRoute.routeConfig && activatedRoute.routeConfig.data && false === activatedRoute.routeConfig.data.breadcrumb)) {
      return [];
    }

    if (activatedRoute.firstChild && (!activatedRoute.routeConfig || !activatedRoute.routeConfig.data.breadcrumb)) {
      return this.buildBreadCrumb(activatedRoute.firstChild);
    }

    const label = activatedRoute.routeConfig ? activatedRoute.routeConfig.data.breadcrumb : 'Accueil';
    const path = activatedRoute.routeConfig ? activatedRoute.routeConfig.path : '';
    const nextUrl = `${url}${path}/`;
    const breadcrumb: BreadCrumb = {
      label,
      path: nextUrl,
    };
    const newBreadcrumbs = [...breadcrumbs, breadcrumb];

    if (activatedRoute.firstChild) {
      return this.buildBreadCrumb(activatedRoute.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }
}
