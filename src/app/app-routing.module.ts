import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  GrowerHomeComponent,
  RequesterHomeComponent,
  ManageRequestComponent,
  ManagePlantComponent,
  ManageRequestDistributionComponent,
  LoginComponent,
  GreenhousesListComponent,
  PlantsListComponent,
  InviteUserComponent,
  ManageAccountComponent,
  GreenhouseCalendarComponent,
  HomeRouterComponent,
  ManageGreenhouseComponent,
  AccountsListComponent,
  ManageAccountRightsComponent,
  ManageAccountRequestComponent,
  ManagePotComponent,
  PotsListComponent
} from './controllers';
import {RouteGuardService} from './services';
import {User} from './models/user';

const routes: Routes = [
  /* Common routes */
  {
    path: 'common-home',
    component: HomeRouterComponent,
    data: {
      breadcrumb: false
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      breadcrumb: false
    }
  },
  {
    path: 'manage-account',
    component: ManageAccountComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: User.roles,
      breadcrumb: 'manageMyAccount'
    }
  },
  {
    path: 'manage-request',
    component: ManageRequestComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: User.roles,
      breadcrumb: 'manageRequest'
    }
  },
  /* Grower routes */
  {
    path: 'grower-home',
    component: GrowerHomeComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: null
    }
  },
  {
    path: 'grower/manage-plant',
    component: ManagePlantComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'managePlant'
    }
  },
  {
    path: 'grower/manage-request-distribution',
    component: ManageRequestDistributionComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'distributeRequestPlants'
    }
  },
  {
    path: 'grower/manage-greenhouse',
    component: ManageGreenhouseComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'manageGreenhouse'
    }
  },
  {
    path: 'grower/greenhouses-list',
    component: GreenhousesListComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'greenhousesList'
    }
  },
  {
    path: 'grower/plants-list',
    component: PlantsListComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'plantsList'
    }
  },
  {
    path: 'grower/pots-list',
    component: PotsListComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'potsList'
    }
  },
  {
    path: 'grower/manage-pot',
    component: ManagePotComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'managePot'
    }
  },
  {
    path: 'grower/invite-user',
    component: InviteUserComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'sendApplicationInvitation'
    }
  },
  {
    path: 'grower/accounts-list',
    component: AccountsListComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'usersList'
    }
  },
  {
    path: 'grower/manage-account-rights',
    component: ManageAccountRightsComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'manageAccountRights'
    }
  },
  {
    path: 'grower/manage-account-request/:id',
    component: ManageAccountRequestComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'manageAccountRequest'
    }
  },
  {
    path: 'grower/greenhouse-calendar',
    component: GreenhouseCalendarComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'greenhouseCalendar'
    }
  },
  /* Requester routes */
  {
    path: 'requester-home',
    canActivate: [RouteGuardService],
    component: RequesterHomeComponent,
    data: {
      roles: [User.roles[0]],
      breadcrumb: null
    }
  },
  {
    path: '**',
    component: HomeRouterComponent,
    data: {
      breadcrumb: null
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
