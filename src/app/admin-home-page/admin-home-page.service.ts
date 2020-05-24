import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminHomePageService {

  constructor(private httpClient: HttpClient) {
  }

  getTest() {
    return this.httpClient.get('https://localhost:8443/authentication-service/api/test');
  }

  getTest2() {
    return this.httpClient.get('https://localhost:8443/codebook-service/api/test');
  }

}
