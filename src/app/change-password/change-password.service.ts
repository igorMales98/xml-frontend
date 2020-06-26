import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private httpClient: HttpClient) {
  }

  checkValidPassword(password: string) {
    return this.httpClient.post<boolean>('https://localhost:8443/authentication-service/api/users/checkPassword',
      {password});
  }

  changePassword(password: string) {
    return this.httpClient.put('https://localhost:8443/authentication-service/api/users/changePassword',
      {password});
  }
}
