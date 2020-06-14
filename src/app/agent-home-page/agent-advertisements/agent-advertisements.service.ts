import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Advertisement} from '../../model/advertisement';
import {Comment} from '../../model/comment';
import {RentRequest} from '../../model/rentRequest';

@Injectable({
  providedIn: 'root'
})
export class AgentAdvertisementsService {

  constructor(private httpClient: HttpClient) {
  }

  getAllAgentAdvertisements(id: string) {
    return this.httpClient.get<Advertisement[]>('https://localhost:8443/advertisement-service/api/advertisements/' + id);
  }

  getComments(adId: string) {
    return this.httpClient.get<Comment[]>('https://localhost:8443/advertisement-service/api/comments/' + adId);
  }

  sendReply(comment: Comment) {
    return this.httpClient.post('https://localhost:8443/advertisement-service/api/comments/reply', comment);
  }

  getBasicSearchForMyAdvertisements(dateFrom: string, dateTo: string, id: string) {
    return this.httpClient.get<Advertisement[]>('https://localhost:8443/advertisement-service/api/advertisements/basicSearchForMyAdvertisements/'
      + dateFrom + '/' + dateTo + '/' + id);
  }

  createRentRequest(rentRequest: RentRequest) {
    return this.httpClient.post('https://localhost:8443/rent-request-service/api/rent-requests', rentRequest);
  }
}
