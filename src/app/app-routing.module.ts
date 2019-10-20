import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {
  GrowerHomeComponent,
  RequesterHomeComponent,
  RequesterManageRequestComponent,
} from './controllers';

const routes: Routes = [
  {
    path: 'grower-home',
    component: GrowerHomeComponent
  },
  {
    path: 'requester-home',
    component: RequesterHomeComponent
  },
  {
    path: '',
    redirectTo: '/requester-home',
    pathMatch: 'full'
  },
  {
    path: 'requester/manage-request',
    component: RequesterManageRequestComponent
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
