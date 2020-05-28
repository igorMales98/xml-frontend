import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Advertisement} from '../../model/advertisement';
import {Comment} from '../../model/comment';

@Injectable({
  providedIn: 'root'
})
export class CustomerAdvertisementsService {

  constructor(private httpClient: HttpClient) {
  }

  getAllCustomerAdvertisements(id: string) {
    return this.httpClient.get<Advertisement[]>('http://localhost:8082/api/advertisement/getAll/' + id);
  }

  getAdvertisementPhotos(adId: string) {
    return this.httpClient.get('http://localhost:8082/api/advertisement/getAdvertisementsPhotos/' + adId);
  }

  getComments(adId: string) {
    return this.httpClient.get<Comment[]>('http://localhost:8082/api/comment/getAll/' + adId);
  }

  sendReply(comment: Comment) {
    return this.httpClient.post('http://localhost:8082/api/comment/sendReply', comment);
  }

}
