import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
  BreadcrumbComponent,
  ShapeFormComponent,
  PaginatorComponent,
  BenchesFormComponent,
  PasswordFormComponent
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
  ManageAccountRequestComponent,
  ManagePotComponent,
  PotsListComponent,
  CreateAccountComponent,
  ResetPasswordComponent
} from './controllers';
import {ReactiveFormsModule} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FullCalendarModule} from '@fullcalendar/angular';
import {SnackbarComponent} from './components/snackbar/snackbar.component';
import {SnackbarService} from './services/snackbar/snackbar.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {
  CaseConverterInterceptorService,
} from './utils/http-interceptors/case-converter-interceptor/case-converter-interceptor.service';
import {TokenInterceptorService} from './utils/http-interceptors/token-interceptor/token-interceptor.service';
import {AuthenticationInterceptorService} from './utils/http-interceptors/authentication-interceptor/authentication-interceptor.service';
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MissingTranslationLoggerHandler} from './utils/missing-translation-logger-handler/missing-translation-logger-handler';
import {PaginatorIntl} from './internationalization/mat-paginator/paginator-intl';
import {MatSelectInfiniteScrollModule} from 'ng-mat-select-infinite-scroll';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    ManageAccountRequestComponent,
    ManagePotComponent,
    PotsListComponent,
    ShapeFormComponent,
    PaginatorComponent,
    CreateAccountComponent,
    BenchesFormComponent,
    ResetPasswordComponent,
    PasswordFormComponent
  ],
  imports: [
    HttpClientModule,
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
    MatSnackBarModule,
    MatSelectInfiniteScrollModule,
    TranslateModule.forRoot({
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MissingTranslationLoggerHandler},
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [
    AskForAccountDialogComponent,
    ForgotPasswordDialogComponent,
    ChangePasswordDialogComponent,
    ConfirmationDialogComponent,
    SnackbarComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CaseConverterInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {
      provide: LOCALE_ID,
      useFactory: (translate: TranslateService) => {
        return translate.currentLang;
      },
      deps: [TranslateService]
    },
    {
      provide: MatPaginatorIntl,
      useFactory: (translate: TranslateService) => {
        const service = new PaginatorIntl();
        service.setTranslateService(translate);
        return service;
      },
      deps: [TranslateService]
    },
    {provide: MAT_DATE_LOCALE, useValue: LOCALE_ID},
    {provide: 'SnackbarServiceInterface', useClass: SnackbarService},
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
