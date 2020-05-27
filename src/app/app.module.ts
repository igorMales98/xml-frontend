import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AdminHomePageComponent} from './admin-home-page/admin-home-page.component';
import {AgentHomePageComponent} from './agent-home-page/agent-home-page.component';
import {CustomerHomePageComponent} from './customer-home-page/customer-home-page.component';
import {TokenInterceptor} from './security/tokenInterceptor';
import { MessagesComponent } from './messages/messages.component';
import { RegistrationComponent } from './registration/registration.component';
import { AgentAdvertisementsComponent } from './agent-home-page/agent-advertisements/agent-advertisements.component';
import { CustomerAdvertisementsComponent } from './customer-home-page/customer-advertisements/customer-advertisements.component';
import { AgentCreateAdvertisementComponent } from './agent-home-page/agent-create-advertisement/agent-create-advertisement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 90,
      gap: 30
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 3000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomePageComponent,
    AgentHomePageComponent,
    CustomerHomePageComponent,
    MessagesComponent,
    RegistrationComponent,
    AgentAdvertisementsComponent,
    CustomerAdvertisementsComponent,
    AgentCreateAdvertisementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
