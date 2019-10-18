import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {
  MatBadgeModule,
  MatButtonModule,
  MatIconModule, MatPaginatorIntl,
  MatPaginatorModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {
  HeaderComponent,
  MenuComponent,
  LoggedUserComponent,
  RequestsListComponent,
} from './components';
import {
  GrowerHomeComponent,
  RequesterHomeComponent,
} from './controllers';
import {getFrenchPaginatorIntl} from './internationalization/mat-paginator/fr-paginator-intl';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    LoggedUserComponent,
    GrowerHomeComponent,
    RequesterHomeComponent,
    RequestsListComponent
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
  ],
  providers: [
    {provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl()}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
