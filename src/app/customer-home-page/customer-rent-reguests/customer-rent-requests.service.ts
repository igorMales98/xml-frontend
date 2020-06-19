import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Comment} from '../../model/comment';
import {RentRequest} from '../../model/rentRequest';

@Injectable({
  providedIn: 'root'
})
export class CustomerRentRequestsService {

  constructor(private httpClient: HttpClient) {
  }

  getCustomerRentRequests(id: string) {
    return this.httpClient.get<RentRequest[]>('https://localhost:8443/rent-request-service/api/rent-requests/customer/' + id);
  }

  getComments(adId: string) {
    return this.httpClient.get<Comment[]>('https://localhost:8443/advertisement-service/api/comments/' + adId);
  }

}
