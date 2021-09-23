import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from './shared/material/material.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { JwtModule } from '@auth0/angular-jwt';
import { PanelWhyModule } from './panel-why/panel-why.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoaderInterceptor } from './shared/interceptors/loading.interceptor';
import { registerLocaleData } from '@angular/common';

import localeEsCO from "@angular/common/locales/es-CO";
registerLocaleData(localeEsCO,'es-CO')

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    HttpClientModule,
    MaterialModule,
    RouterModule,
    PanelWhyModule,
    NgxSpinnerModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: null,
        allowedDomains: [],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-CO'
    },
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'COP' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
