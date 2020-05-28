import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AdminHomePageComponent} from './admin-home-page/admin-home-page.component';
import {AgentHomePageComponent} from './agent-home-page/agent-home-page.component';
import {CustomerHomePageComponent} from './customer-home-page/customer-home-page.component';
import {MessagesComponent} from './messages/messages.component';
import {RegistrationComponent} from './registration/registration.component';
import {CreateAdvertisementComponent} from './create-advertisement/create-advertisement.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'adminHomePage', component: AdminHomePageComponent},
  {path: 'agentHomePage', component: AgentHomePageComponent},
  {path: 'customerHomePage', component: CustomerHomePageComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'createAdvertisement', component: CreateAdvertisementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
