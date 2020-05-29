import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Advertisement} from '../model/advertisement';
import {Comment} from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class AdminHomePageService {

  constructor(private httpClient: HttpClient) {
  }

  getAllAdvertisements() {
    return this.httpClient.get<Advertisement[]>('https://localhost:8443/advertisement-service/api/advertisement/all');
  }

  getAdvertisementPhotos(adId: string) {
    return this.httpClient.get('https://localhost:8443/advertisement-service/api/advertisement/getAdvertisementsPhotos/' + adId);
  }

  getComments(adId: string) {
    return this.httpClient.get<Comment[]>('https://localhost:8443/advertisement-service/api/comment/all/' + adId);
  }

}
