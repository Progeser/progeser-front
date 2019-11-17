import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {
  MAT_DATE_LOCALE,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatBadgeModule,
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatNativeDateModule, MatPaginatorIntl,
  MatPaginatorModule, MatSelectModule, MatSnackBarModule,
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
  ManageRequestComponent,
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
  ManageGreenhouseComponent,
  ConfirmationDialogComponent,
  ChangePasswordDialogComponent,
  AccountsListComponent,
  ManageAccountRightsComponent,
  ManageAccountRequestComponent
} from './controllers';
import {getFrenchPaginatorIntl} from './internationalization/mat-paginator/fr-paginator-intl';
import {ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FullCalendarModule} from '@fullcalendar/angular';
import {SnackbarComponent} from './components/snackbar/snackbar.component';
import {SnackbarService} from './services/snackbar/snackbar.service';

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
    ManageRequestComponent,
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
    HomeRouterComponent,
    SnackbarComponent,
    ConfirmationDialogComponent,
    ChangePasswordDialogComponent,
    AccountsListComponent,
    ManageAccountRightsComponent,
    ManageAccountRequestComponent
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
    FullCalendarModule,
    MatSnackBarModule
  ],
  entryComponents: [
    AskForAccountDialogComponent,
    ForgotPasswordDialogComponent,
    ChangePasswordDialogComponent,
    ConfirmationDialogComponent,
    SnackbarComponent
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: LOCALE_ID, useValue: 'fr'},
    {provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl()},
    {provide: MAT_DATE_LOCALE, useValue: LOCALE_ID},
    {provide: 'SnackbarServiceInterface', useClass: SnackbarService},
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
