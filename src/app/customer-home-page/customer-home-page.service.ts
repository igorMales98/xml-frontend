import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Advertisement} from '../model/advertisement';
import {Comment} from '../model/comment';
import {RentRequest} from '../model/rentRequest';

@Injectable({
  providedIn: 'root'
})
export class CustomerHomePageService {

  constructor(private httpClient: HttpClient) {
  }

  getAllAdvertisements() {
    return this.httpClient.get<Advertisement[]>('https://localhost:8443/advertisement-service/api/advertisements');
  }

  getComments(adId: string) {
    return this.httpClient.get<Comment[]>('https://localhost:8443/advertisement-service/api/comments/' + adId);
  }

  getBasicSearch(dateFrom: string, dateTo: string, place: string) {
    return this.httpClient.get<Advertisement[]>('https://localhost:8443/advertisement-service/api/advertisements/basicSearch/'
      + dateFrom + '/' + dateTo + '/' + place);
  }

  createRentRequest(rentRequest: RentRequest) {
    return this.httpClient.post('https://localhost:8443/rent-request-service/api/rent-requests', rentRequest);
  }

}
