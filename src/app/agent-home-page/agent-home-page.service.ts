import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Advertisement} from '../model/advertisement';
import {Comment} from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class AgentHomePageService {

  constructor(private httpClient: HttpClient) {
  }

  getAllAdvertisements() {
    return this.httpClient.get<Advertisement[]>('https://localhost:8443/advertisement-service/api/advertisements');
  }

  getComments(adId: string) {
    return this.httpClient.get<Comment[]>('https://localhost:8443/advertisement-service/api/comments/' + adId);
  }

}
