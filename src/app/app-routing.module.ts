import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminHomePageComponent} from './admin-home-page/admin-home-page.component';
import {AgentHomePageComponent} from './agent-home-page/agent-home-page.component';
import {CustomerHomePageComponent} from './customer-home-page/customer-home-page.component';
import {MessagesComponent} from './messages/messages.component';
import {RegistrationComponent} from './registration/registration.component';
import {CreateAdvertisementComponent} from './create-advertisement/create-advertisement.component';
import {AgentAdvertisementsComponent} from './agent-home-page/agent-advertisements/agent-advertisements.component';
import {CustomerAdvertisementsComponent} from './customer-home-page/customer-advertisements/customer-advertisements.component';
import {AppComponent} from './app.component';
import { CarBrandComponent } from './admin-home-page/codebook/car-brand/car-brand.component';
import { CarModelComponent } from './admin-home-page/codebook/car-model/car-model.component';
import { CarClassComponent } from './admin-home-page/codebook/car-class/car-class.component';
import { FuelTypeComponent } from './admin-home-page/codebook/fuel-type/fuel-type.component';
import { TransmissionTypeComponent } from './admin-home-page/codebook/transmission-type/transmission-type.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'adminHomePage', component: AdminHomePageComponent},
  {path: 'agentHomePage', component: AgentHomePageComponent},
  {path: 'customerHomePage', component: CustomerHomePageComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'createAdvertisement', component: CreateAdvertisementComponent},
  {path: 'agentAdvertisements', component: AgentAdvertisementsComponent},
  {path: 'customerAdvertisements', component: CustomerAdvertisementsComponent},
  {path: 'carBrand', component: CarBrandComponent},
  {path: 'carModel', component: CarModelComponent},
  {path: 'carClass', component: CarClassComponent},
  {path: 'fuelType', component: FuelTypeComponent},
  {path: 'transmissionType', component: TransmissionTypeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
