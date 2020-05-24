import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerHomePageService {

  constructor(private httpClient: HttpClient) {
  }

  getTest() {
    return this.httpClient.get('http://localhost:8091/authentication-service/api/test');
  }

}
