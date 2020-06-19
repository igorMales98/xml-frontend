import {Component, OnInit, TemplateRef} from '@angular/core';
import {faInfo, faCommentAlt, faUser, faCartPlus, faCheckDouble} from '@fortawesome/free-solid-svg-icons';
import {Advertisement} from '../../model/advertisement';
import {Comment} from '../../model/comment';
import {CustomerRentRequestsService} from './customer-rent-requests.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../model/user';
import {UserService} from '../../security/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {NotifierService} from 'angular-notifier';
import {RentRequest} from '../../model/rentRequest';
import {Router} from '@angular/router';
@Component({
  selector: 'app-customer-rent-reguests',
  templateUrl: './customer-rent-reguests.component.html',
  styleUrls: ['./customer-rent-reguests.component.css']
})
export class CustomerRentReguestsComponent implements OnInit {

  faCommentAlt = faCommentAlt;
  faInfo = faInfo;
  faUser = faUser;
  allRentRequests: RentRequest[] = [];
  comments: Comment[] = [];
  moreInfoAdvertisement: Advertisement;
  user: User;

  allImagesForAd: string[] = [];
  private readonly imageType: string = 'data:image/PNG;base64,';

  closeResult: string;
  clickedComment: number;

  customerData: FormGroup;
  startDate: string;
  endDate: string;
  minDateStart: string;
  minDateEnd: string;
  disableRest = false;

  physicalRent = false;
  notifier: NotifierService;
  bundle = true;

  constructor(private customerRentRequestsService: CustomerRentRequestsService, private domSanitizer: DomSanitizer,
              private modalService: NgbModal, private userService: UserService, private formBuilder: FormBuilder,
              private datePipe: DatePipe, private notifierService: NotifierService, private router: Router) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;

    this.customerRentRequestsService.getCustomerRentRequests(this.user.id).subscribe(data => {
      this.allRentRequests = data;
      console.log(data[4].advertisementsForRent);
      for (const rentRequest of this.allRentRequests) {
        for (const advertisement of rentRequest.advertisementsForRent) {
          advertisement.image = [];
          const images = advertisement.img.toString();
          this.allImagesForAd = images.split(',');
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.allImagesForAd.length; i++) {
            advertisement.image.push(this.domSanitizer.bypassSecurityTrustUrl(this.imageType + this.allImagesForAd[i]));
          }
        }
      }
    });

  }

  get fcd() {
    return this.customerData.controls;
  }

  openMoreInfoModal(myModalMoreInfo: TemplateRef<any>, advertisement: Advertisement) {
    this.modalService.open(myModalMoreInfo, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      windowClass: 'myCustomModalClass'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.moreInfoAdvertisement = advertisement;
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

  openComments(myModalMoreInfo: TemplateRef<any>, advertisement: Advertisement) {
    this.comments = [];
    this.customerRentRequestsService.getComments(advertisement.id).subscribe(data => {
      this.comments = data;
    });
    this.modalService.open(myModalMoreInfo, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      windowClass: 'myCustomModalClass'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.moreInfoAdvertisement = advertisement;
  }

  openModal(content: TemplateRef<any>, commentId: number) {
    this.clickedComment = commentId;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  changeBundle() {
    console.log(this.bundle);
  }

  check(a: string) {
    console.log(a);
  }
  public niceDate(date: string) {
    var splitDate = date.toString().split(',');
    var niceDate = splitDate[2]+"."+splitDate[1]+"."+splitDate[0];
    return niceDate;
  }

}
