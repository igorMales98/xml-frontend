import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import { RentRequest } from '../model/rentRequest';

@Injectable({
  providedIn: 'root'
})
export class RentRequestsService {

  constructor(private httpClient: HttpClient) {
  }

  getAllRequests(id: string) {
    return this.httpClient.get<RentRequest[]>('https://localhost:8443/rent-request-service/api/rent-requests/all/' + id);
  }

  cancelRequest(id: number){
    return this.httpClient.delete('https://localhost:8443/rent-request-service/api/rent-requests/' + id);
  }

  acceptRequest(id: string){
    return this.httpClient.put('https://localhost:8443/rent-request-service/api/rent-requests/' + id, null);
  }




}
