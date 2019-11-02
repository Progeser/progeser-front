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
  HomeRouterComponent
} from './controllers';

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
    data: {
      breadcrumb: 'Gestion de mon compte utilisateur'
    }
  },
  /* Grower routes */
  {
    path: 'grower-home',
    component: GrowerHomeComponent,
    data: {
      breadcrumb: null
    }
  },
  {
    path: 'grower/manage-plant',
    component: ManagePlantComponent,
    data: {
      breadcrumb: 'Gestion des plantes'
    }
  },
  {
    path: 'grower/manage-request-distribution',
    component: ManageRequestDistributionComponent,
    data: {
      breadcrumb: 'Répartition des plantes d\'une demande'
    }
  },
  {
    path: 'grower/greenhouses-list',
    component: GreenhousesListComponent,
    data: {
      breadcrumb: 'Liste des serres'
    }
  },
  {
    path: 'grower/plants-list',
    component: PlantsListComponent,
    data: {
      breadcrumb: 'Liste des plantes'
    }
  },
  {
    path: 'grower/invite-user',
    component: InviteUserComponent,
    data: {
      breadcrumb: 'Envoyer une invitation d\'accès à l\'application'
    }
  },
  {
    path: 'grower/greenhouse-calendar',
    component: GreenhouseCalendarComponent,
    data: {
      breadcrumb: 'Calendrier de serre'
    }
  },
  /* Requester routes */
  {
    path: 'requester-home',
    component: RequesterHomeComponent,
    data: {
      breadcrumb: null
    }
  },
  {
    path: 'requester/manage-request',
    component: RequesterManageRequestComponent,
    data: {
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
