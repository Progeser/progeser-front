import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  GrowerHomeComponent,
  RequesterHomeComponent,
  RequesterManageRequestComponent,
  ManagePlantComponent,
  ManageRequestDistributionComponent,
} from './controllers';

const routes: Routes = [
  /* Grower routes */
  {
    path: 'grower-home',
    component: GrowerHomeComponent
  },
  {
    path: 'grower/manage-plant',
    component: ManagePlantComponent
  },
  {
    path: 'grower/manage-request-distribution',
    component: ManageRequestDistributionComponent,
  },
  /* Requester routes */
  {
    path: 'requester-home',
    component: RequesterHomeComponent
  },
  {
    path: 'requester/manage-request',
    component: RequesterManageRequestComponent
  },
  /* Redirects */
  {
    path: '',
    redirectTo: '/requester-home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: RequesterHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
