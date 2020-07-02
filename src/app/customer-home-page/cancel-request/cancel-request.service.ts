import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RentRequest} from '../../model/rentRequest';

@Injectable({
  providedIn: 'root'
})
export class CancelRequestService {

  constructor(private httpClient: HttpClient) {
  }

  getRentRequests(id: string) {
    return this.httpClient.get<RentRequest[]>('https://localhost:8443/rent-request-service/api/rent-requests/customer/pending/' + id);
  }

  cancelRequest(id: string) {
    return this.httpClient.delete('https://localhost:8443/rent-request-service/api/rent-requests/' + id);
  }

}
