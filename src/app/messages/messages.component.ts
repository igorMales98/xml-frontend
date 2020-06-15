import { Component, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';
import { User } from '../model/user';
import {Message} from '../model/message';
import {UserService} from '../security/user.service'
//TODO: scroll i refresh
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  customers: User[] = [];
  messages: Message[] = [];
  clickedCustomer: User;
  user: User;
  newMessageHidden: boolean;

  constructor(private messagesService: MessagesService, private userService: UserService) {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;
    this.newMessageHidden = true;
   }

  ngOnInit(): void {
    this.messagesService.getPeople(this.user.id).subscribe(data => {
      this.customers = data
      console.log(this.user);
      console.log(this.customers);
    });
  }

  showMessages(customer: User) {
    this.newMessageHidden = false;
    this.messagesService.getMessages(this.user.id,customer.id).subscribe(data => {
      this.messages = data;
      for (let i=0;i<this.messages.length;i++) {
        this.messages[i].messageDate = this.formatDate(this.messages[i].messageDate);
        if (this.messages[i].sender.id == this.user.id)
          this.messages[i].type = "agent";
        else 
          this.messages[i].type = "customer";
      }
      this.clickedCustomer = customer;
      (<HTMLInputElement>document.getElementById("newMessage")).value = '';
    });
  }

  sendMessage() {
    let body = (<HTMLInputElement>document.getElementById("newMessage")).value;
    let message = new Message(body,this.clickedCustomer,this.user);
    this.messagesService.sendMessage(message).subscribe();
    this.ngOnInit();
    this.showMessages(this.clickedCustomer);
  }
 
  formatDate(oldDate: string) {
    let newDate;
    newDate = (+oldDate[3]<10?("0"+oldDate[3]):oldDate[3])+":"+(+oldDate[4]<10?("0"+oldDate[4]):oldDate[4])+' '+oldDate[2]+'.'+oldDate[1]+'.'+oldDate[0];
    return newDate;
  }
}
