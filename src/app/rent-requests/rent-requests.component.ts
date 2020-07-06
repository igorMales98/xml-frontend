import {Component, OnInit} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {UserService} from '../security/user.service';
import {User} from '../model/user';
import {RentRequest} from '../model/rentRequest';
import {RentRequestsService} from './rent-requests.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rent-requests',
  templateUrl: './rent-requests.component.html',
  styleUrls: ['./rent-requests.component.css']
})
export class RentRequestsComponent implements OnInit {

  notifier: NotifierService;
  loggedUser: User;
  allRequests: RentRequest[] = [];
  cancelId: number;
  requestsCount: number;

  constructor(private notifierService: NotifierService, public userService: UserService,
              private rentRequestService: RentRequestsService, private modalService: NgbModal) {
    this.notifier = notifierService;

  }

  ngOnInit(): void {
    this.userService.getMyInfo();
    this.loggedUser = this.userService.currentUser;
    this.rentRequestService.getAllRequests(this.loggedUser.id).subscribe(data => {
      this.allRequests = data;
      this.requestsCount = this.allRequests.length;
    });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  openConfirmDeleteModal(targetModal, id) {
    this.cancelId = id;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  cancelRentRequest() {
    this.rentRequestService.cancelRequest(this.cancelId).subscribe(data => {
      this.showNotification('success', 'Rent request is successfully cancelled!');
      this.modalService.dismissAll();
      this.ngOnInit();
    });
  }

  acceptRentRequest(requestId: string) {
    console.log(requestId);
    this.rentRequestService.acceptRequest(requestId).subscribe(data => {
      this.showNotification('success', 'Rent request is successfully accepted!');
      this.ngOnInit();
    });
  }


}
