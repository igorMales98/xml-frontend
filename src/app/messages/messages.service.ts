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

  getReservedCustomers() {
    return this.httpClient.get<User[]>('http://localhost:8091/message-service/api/getReservedCustomers/' + this.userTokenState.accessToken);
  }

  getMessages(agentId: string, customerId: string) {
    return this.httpClient.get<Message[]>('http://localhost:8091/message-service/api/getMessages/' + agentId + '/' + customerId);
  }

  sendMessage(message: Message) {
    return this.httpClient.post('http://localhost:8091/message-service/api/sendMessage', message);
  }
}
