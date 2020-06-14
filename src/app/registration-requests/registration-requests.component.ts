import { Component, OnInit } from '@angular/core';
import { RegistrationRequest } from '../model/registrationRequest';
import { RegistrationRequestsService } from './registration-requests.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.css']
})
export class RegistrationRequestsComponent implements OnInit {
  
  notifier: NotifierService;
  allRegistrationRequests: RegistrationRequest[] = [];
  requestIdToDelete: number;
  registrationRequestExist: boolean;
  requestCount: number;
  
  constructor(private registrationRequestsService: RegistrationRequestsService, private modalService: NgbModal,
    private notifierService: NotifierService) {
      this.notifier = notifierService;
     }

  ngOnInit(): void {
    this.registrationRequestsService.getAllRegistrationRequests().subscribe(data => {
      this.allRegistrationRequests = data;
      this.requestCount = this.allRegistrationRequests.length;
      console.log(this.requestCount);

    });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  openConfirmDeleteModal(targetModal, id) {
    this.requestIdToDelete = id;
    console.log(this.requestIdToDelete);
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }


  deleteRegistrationRequest(){
    this.registrationRequestsService.deleteRegistrationRequest(this.requestIdToDelete).subscribe(data => {
      this.showNotification('success', 'Registration Request is successfuly deleted.');
      this.modalService.dismissAll();
      this.ngOnInit();
    });
  }

  confirmRegistrationRequest(request: RegistrationRequest){
    this.registrationRequestsService.confirmRegistrationRequest(request).subscribe(data => {
      this.showNotification('success', 'Registration Request is approved.');
      this.ngOnInit();
    });
  }

}
