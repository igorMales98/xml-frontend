import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Agent} from '../model/agent';

@Injectable({
  providedIn: 'root'
})
export class AgentRegisterService {

  constructor(private httpClient: HttpClient) {
  }

  register(agent: Agent){
      return this.httpClient.post('https://localhost:8443/authentication-service/api/users/agent', agent);
  }

}