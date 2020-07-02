import {Component, OnInit} from '@angular/core';
import {CancelRequestService} from './cancel-request.service';
import {RentRequest} from '../../model/rentRequest';
import {User} from '../../model/user';
import {UserService} from '../../security/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-cancel-request',
  templateUrl: './cancel-request.component.html',
  styleUrls: ['./cancel-request.component.css']
})
export class CancelRequestComponent implements OnInit {

  rentRequests: RentRequest[] = [];
  loggedInUser: User;
  cancelId: string;
  notifier: NotifierService;

  constructor(private cancelRequestService: CancelRequestService, private userService: UserService, private modalService: NgbModal,
              private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.userService.getMyInfo();
    this.loggedInUser = this.userService.currentUser;
    this.cancelRequestService.getRentRequests(this.loggedInUser.id).subscribe(data => {
      this.rentRequests = data;
    });
  }

  openConfirmDeleteModal(targetModal, id) {
    this.cancelId = id;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  cancelRentRequest() {
    this.cancelRequestService.cancelRequest(this.cancelId).subscribe(data => {
      this.showNotification('success', 'Rent request is successfully cancelled!');
      this.modalService.dismissAll();
      this.ngOnInit();
    });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

}
