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
import { RegistrationRequestsComponent } from './registration-requests/registration-requests.component';
import { BlockActivateRemoveCustomersComponent } from './block-activate-remove-customers/block-activate-remove-customers.component';
import { AgentRegisterComponent } from './agent-register/agent-register.component';
import { RentRequestsComponent} from './rent-requests/rent-requests.component'

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
  {path: 'registrationRequests', component: RegistrationRequestsComponent},
  {path: 'blockActivateRemoveCustomer', component: BlockActivateRemoveCustomersComponent},
  {path: 'agentRegister', component: AgentRegisterComponent},
  {path: 'rentRequests', component: RentRequestsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
