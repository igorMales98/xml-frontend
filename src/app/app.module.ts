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
import {MessagesComponent} from './messages/messages.component';
import {RegistrationComponent} from './registration/registration.component';
import {AgentAdvertisementsComponent} from './agent-home-page/agent-advertisements/agent-advertisements.component';
import {CustomerAdvertisementsComponent} from './customer-home-page/customer-advertisements/customer-advertisements.component';
import {CreateAdvertisementComponent} from './create-advertisement/create-advertisement.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CarBrandComponent } from './admin-home-page/codebook/car-brand/car-brand.component';
import { CarModelComponent } from './admin-home-page/codebook/car-model/car-model.component';
import { CarClassComponent } from './admin-home-page/codebook/car-class/car-class.component';
import { FuelTypeComponent } from './admin-home-page/codebook/fuel-type/fuel-type.component';
import { TransmissionTypeComponent } from './admin-home-page/codebook/transmission-type/transmission-type.component';
import { CommentComponent } from './admin-home-page/codebook/comment/comment.component';
import {DatePipe} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { RegistrationRequestsComponent } from './registration-requests/registration-requests.component';
import { BlockActivateRemoveCustomersComponent } from './block-activate-remove-customers/block-activate-remove-customers.component';
import { CustomerRentReguestsComponent } from './customer-home-page/customer-rent-reguests/customer-rent-reguests.component';
import { AgentRegisterComponent } from './agent-register/agent-register.component';
import { RentRequestsComponent } from './rent-requests/rent-requests.component';
import { AccountConfirmationComponent } from './account-confirmation/account-confirmation.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PricelistComponent } from './pricelist/pricelist.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CancelRequestComponent } from './customer-home-page/cancel-request/cancel-request.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {ChartsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import { ReportComponent } from './report/report.component';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AgmCoreModule } from '@agm/core';

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
    CreateAdvertisementComponent,
    CarBrandComponent,
    CarModelComponent,
    CarClassComponent,
    FuelTypeComponent,
    TransmissionTypeComponent,
    CommentComponent,
    CreateAdvertisementComponent,
    RegistrationRequestsComponent,
    BlockActivateRemoveCustomersComponent,
    CustomerRentReguestsComponent,
    AgentRegisterComponent,
    RentRequestsComponent,
    AccountConfirmationComponent,
    ChangePasswordComponent,
    CancelRequestComponent,
    PricelistComponent,
    StatisticsComponent,
    ReportComponent
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
    MatCheckboxModule,
    MatTableModule,
    MatSlideToggleModule,
    ChartsModule,
    MatFormFieldModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcBUQxfS6JldNG0Ltoju5YxE_0-CKJsu4'
    }),
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
