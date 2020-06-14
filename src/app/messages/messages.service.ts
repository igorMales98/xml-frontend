import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {Message} from '../model/message';
import {UserTokenState} from '../model/userTokenState';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  userTokenState: UserTokenState;

  constructor(private httpClient: HttpClient) {
    this.userTokenState = JSON.parse(localStorage.getItem('user'));
  }

  getPeople(id: string) {
    return this.httpClient.get<User[]>('https://localhost:8443/message-service/api/messages/getPeople/'+id);
  }

  getMessages(agentId: string, customerId: string) {
    return this.httpClient.get<Message[]>('https://localhost:8443/message-service/api/messages/getMessages/'+agentId +'/'+customerId);

  }

  sendMessage(message: Message) {
    return this.httpClient.post('https://localhost:8443/message-service/api/messages/sendMessage', message);
  }
}
