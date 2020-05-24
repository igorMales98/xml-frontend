import { Component, OnInit } from '@angular/core';
import { MessagesService } from './messages.service';
import { User } from '../model/user';
import {Message} from '../model/message';
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
  agentId = '1';
  show: boolean;

  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.messagesService.getReservedCustomers().subscribe(data => {
      this.customers = data
    });
  }

  showMessages(customer: User) {
    this.messagesService.getMessages(this.agentId,customer.id).subscribe(data => {
      this.messages = data;
      for (let i=0;i<this.messages.length;i++) {
        this.messages[i].messageDate = this.formatDate(this.messages[i].messageDate);
        if (this.messages[i].sender.id == this.agentId)
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
    let message = new Message(body,this.clickedCustomer);
    this.messagesService.sendMessage(message).subscribe();
    this.showMessages(this.clickedCustomer);
  }
 
  formatDate(oldDate: string) {
    let newDate;
    newDate = (+oldDate[3]<10?("0"+oldDate[3]):oldDate[3])+":"+(+oldDate[4]<10?("0"+oldDate[4]):oldDate[4])+' '+oldDate[2]+'.'+oldDate[1]+'.'+oldDate[0];
    return newDate;
  }
}
