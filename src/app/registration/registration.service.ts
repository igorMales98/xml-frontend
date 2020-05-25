import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegistrationRequest} from '../model/registrationRequest';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) {
  }

  create(registration: RegistrationRequest) {
    return this.httpClient.post('http://localhost:8083/api/auth/register', registration);
  }

}
