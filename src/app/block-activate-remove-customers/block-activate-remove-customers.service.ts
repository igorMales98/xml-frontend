import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class BlockActivateRemoveCustomerService {

  constructor(private httpClient: HttpClient) {
  }

  getAllRegistrationRequests() {
    return this.httpClient.get<User[]>('https://localhost:8443/authentication-service/api/blockActivateRemoveCustomer/all');
  }

  deleteCustomer(customerId: number) {
    return this.httpClient.delete('https://localhost:8443/authentication-service/api/blockActivateRemoveCustomer/' + customerId);
  }

  blockCustomer(customerId: number) {
    return this.httpClient.put('https://localhost:8443/authentication-service/api/blockActivateRemoveCustomer/block/' + customerId,
      null);
  }

  activateCustomer(customerId: number) {
    return this.httpClient.put('https://localhost:8443/authentication-service/api/blockActivateRemoveCustomer/activate/' + customerId,
      null);
  }


}
