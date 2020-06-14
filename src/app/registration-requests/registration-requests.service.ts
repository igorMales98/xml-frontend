import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegistrationRequest} from '../model/registrationRequest';

@Injectable({
  providedIn: 'root'
})
export class RegistrationRequestsService {

  constructor(private httpClient: HttpClient) {
  }

  getAllRegistrationRequests() {
    return this.httpClient.get<RegistrationRequest[]>('https://localhost:8443/authentication-service/api/registration-requests');
  }

  deleteRegistrationRequest(id: number) {
    return this.httpClient.delete('https://localhost:8443/authentication-service/api/registration-requests/' + id);
  }

  confirmRegistrationRequest(request: RegistrationRequest) {
    return this.httpClient.post('https://localhost:8443/authentication-service/api/registration-requests', request);
  }

}
