import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class BlockActivateRemoveCustomerService {

  constructor(private httpClient: HttpClient) {
  }

  getAllUsers() {
    return this.httpClient.get<User[]>('https://localhost:8443/authentication-service/api/users');
  }

  deleteCustomer(customerId: number) {
    return this.httpClient.delete('https://localhost:8443/authentication-service/api/users/' + customerId);
  }

  blockCustomer(customerId: number) {
    return this.httpClient.put('https://localhost:8443/authentication-service/api/users/block/' + customerId,
      null);
  }

  activateCustomer(customerId: number) {
    return this.httpClient.put('https://localhost:8443/authentication-service/api/users/activate/' + customerId,
      null);
  }

  getUserById(customerId: number) {
    return this.httpClient.get<User>('https://localhost:8443/authentication-service/api/users/'+customerId);
  }

  setUserPermissions(customer: User) {
    return this.httpClient.put('https://localhost:8443/authentication-service/api/users',customer);
  }
}
