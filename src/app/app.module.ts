import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {
  MAT_DATE_LOCALE,
  MatBadgeModule,
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatNativeDateModule, MatPaginatorIntl,
  MatPaginatorModule, MatSelectModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {
  HeaderComponent,
  MenuComponent,
  LoggedUserComponent,
  RequestsListComponent,
  BreadcrumbComponent
} from './components';
import {
  GrowerHomeComponent,
  RequesterHomeComponent,
  RequesterManageRequestComponent,
  ManagePlantComponent,
  ManageRequestDistributionComponent,
  LoginComponent,
  ForgotPasswordDialogComponent,
  AskForAccountDialogComponent,
  GreenhousesListComponent,
  PlantsListComponent,
  InviteUserComponent,
  ManageAccountComponent,
  GreenhouseCalendarComponent,
  HomeRouterComponent,
  ManageGreenhouseComponent
} from './controllers';
import {getFrenchPaginatorIntl} from './internationalization/mat-paginator/fr-paginator-intl';
import {ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FullCalendarModule} from '@fullcalendar/angular';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    LoggedUserComponent,
    GrowerHomeComponent,
    RequesterHomeComponent,
    RequestsListComponent,
    RequesterManageRequestComponent,
    ManagePlantComponent,
    ManageRequestDistributionComponent,
    BreadcrumbComponent,
    LoginComponent,
    ForgotPasswordDialogComponent,
    AskForAccountDialogComponent,
    GreenhousesListComponent,
    PlantsListComponent,
    InviteUserComponent,
    ManageAccountComponent,
    ManageGreenhouseComponent,
    ManageAccountComponent,
    GreenhouseCalendarComponent,
    HomeRouterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    DragDropModule,
    MatDialogModule,
    FullCalendarModule
  ],
  entryComponents: [
    AskForAccountDialogComponent,
    ForgotPasswordDialogComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr'},
    {provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl()},
    {provide: MAT_DATE_LOCALE, useValue: LOCALE_ID},
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
