import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  GrowerHomeComponent,
  RequesterHomeComponent,
  RequesterManageRequestComponent,
  ManagePlantComponent,
  ManageRequestDistributionComponent,
  LoginComponent,
  GreenhousesListComponent,
  PlantsListComponent,
  InviteUserComponent,
  ManageAccountComponent,
  GreenhouseCalendarComponent,
  HomeRouterComponent,
  ManageGreenhouseComponent
} from './controllers';
import {RouteGuardService} from './services/route-guard/route-guard.service';
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
      breadcrumb: 'Gestion de mon compte utilisateur'
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
      breadcrumb: 'Gestion des plantes'
    }
  },
  {
    path: 'grower/manage-request-distribution',
    component: ManageRequestDistributionComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'Répartition des plantes d\'une demande'
    }
  },
  {
    path: 'grower/manage-greenhouse',
    component: ManageGreenhouseComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'Gestion d\'une serre'
    }
  },
  {
    path: 'grower/greenhouses-list',
    component: GreenhousesListComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'Liste des serres'
    }
  },
  {
    path: 'grower/plants-list',
    component: PlantsListComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'Liste des plantes'
    }
  },
  {
    path: 'grower/invite-user',
    component: InviteUserComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'Envoyer une invitation d\'accès à l\'application'
    }
  },
  {
    path: 'grower/greenhouse-calendar',
    component: GreenhouseCalendarComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[1]],
      breadcrumb: 'Calendrier de serre'
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
    path: 'requester/manage-request',
    component: RequesterManageRequestComponent,
    canActivate: [RouteGuardService],
    data: {
      roles: [User.roles[0]],
      breadcrumb: 'Gestion d\'une demande'
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
