import {Component, OnInit} from '@angular/core';
import {BlockActivateRemoveCustomerService} from './block-activate-remove-customers.service';
import {User} from '../model/user';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-block-activate-remove-customers',
  templateUrl: './block-activate-remove-customers.component.html',
  styleUrls: ['./block-activate-remove-customers.component.css']
})
export class BlockActivateRemoveCustomersComponent implements OnInit {

  allCustomers: User[] = [];
  userIdToDelete: number;
  notifier: NotifierService;
  customersCount: number;

  constructor(private blockActivateRemoveService: BlockActivateRemoveCustomerService, private modalService: NgbModal,
              private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.blockActivateRemoveService.getAllRegistrationRequests().subscribe(data => {
      this.allCustomers = data;
      this.customersCount = this.allCustomers.length;
    });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  openConfirmDeleteModal(targetModal, id) {
    this.userIdToDelete = id;
    console.log(this.userIdToDelete);
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  deleteCustomer() {
    this.blockActivateRemoveService.deleteCustomer(this.userIdToDelete).subscribe(data => {
      this.showNotification('success', 'Customer is successfuly deleted.');
      this.modalService.dismissAll();
      this.ngOnInit();
    });
  }

  blockCustomer(customerId: number) {
    this.blockActivateRemoveService.blockCustomer(customerId).subscribe(data => {
      this.showNotification('success', 'Customer is successfuly blocked.');
      this.ngOnInit();
    });
  }

  activateCustomer(customerId: number) {
    this.blockActivateRemoveService.activateCustomer(customerId).subscribe(data => {
      this.showNotification('success', 'Customer is successfuly activated.');
      this.ngOnInit();
    });
  }


}
