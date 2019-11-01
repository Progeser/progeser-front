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
  PlantsListComponent, InviteUserComponent,
} from './controllers';

const routes: Routes = [
  /* Common routes */
  {
    path: 'login',
    component: LoginComponent,
    data: {
      breadcrumb: false
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
  /* Redirects */
  {
    path: '',
    redirectTo: '/requester-home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: RequesterHomeComponent,
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
