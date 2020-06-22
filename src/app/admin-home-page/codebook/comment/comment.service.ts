import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Comment} from 'src/app/model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  getAllComents() {
    return this.httpClient.get<Comment[]>('https://localhost:8443/advertisement-service/api/comments');
  }

  acceptComment(id: number) {
    return this.httpClient.put('https://localhost:8443/advertisement-service/api/comments/approve/' + id, null);
  }

  rejectComment(id: number) {
    return this.httpClient.delete('https://localhost:8443/advertisement-service/api/comments/' + id);
  }

}
