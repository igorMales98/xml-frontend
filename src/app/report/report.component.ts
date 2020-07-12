import { Component, OnInit, TemplateRef } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { RentRequest } from '../model/rentRequest';
import { Advertisement } from '../model/advertisement';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportService } from './report.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Report } from '../model/report';
import { User } from '../model/user';
import {UserService} from '../security/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  allPaidRentRequests: RentRequest[] = [];
  notifier: NotifierService;
  advertisement: Advertisement;
  closeResult: string;
  rentRequest: RentRequest;
  infoForm: FormGroup;
  loggedInUser: User;

  constructor(private reportService: ReportService, private modalService: NgbModal, private router: Router,
              private notifierService: NotifierService, private formBuilder: FormBuilder, private userService : UserService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.userService.getMyInfo();
    this.loggedInUser = this.userService.currentUser;

    this.reportService.getAdvertiserPaidRequests(this.loggedInUser.id).subscribe(data => {
      this.allPaidRentRequests = data;
    });
    this.infoForm = this.formBuilder.group({
      km: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      additionalInformation: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]]
    });
  }

  get fci() {
    return this.infoForm.controls;
  }

  openMoreInfoModal(myModalMoreInfo: TemplateRef<any>, advertisement1: Advertisement, request: RentRequest) {
    this.rentRequest = request;
    this.advertisement = advertisement1;
    this.modalService.open(myModalMoreInfo, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      windowClass: 'myCustomModalClass'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  createReport() {
    const report = new Report(this.advertisement.car, this.infoForm.value.km, this.infoForm.value.additionalInformation, this.rentRequest);

    this.reportService.createReport(report).subscribe(data => {
      this.showNotification('success', 'Successfully created report.');
    });

    this.modalService.dismissAll();
    this.router.navigate(['/agentHomePage']);
  }

  checkIfReportExists(request, advertisement) {
    let exist = false;

    request.reports.forEach(element => {
      if(element.carId === advertisement.car.id)
      exist = true;
    });

    return exist;
  }

}
