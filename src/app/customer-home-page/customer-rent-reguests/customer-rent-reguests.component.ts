import {Component, OnInit, TemplateRef, ɵclearResolutionOfComponentResourcesQueue} from '@angular/core';
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
  clickedComment: string;
  clickedAdvertisement: Advertisement;
  btnPostComment: Set<boolean> = new Set();
  newComment: Comment;
  currentRate: number;
  currentRateChanged: boolean;

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
          let dateReserved = new Date(rentRequest.reservedTo[0]+"-"+rentRequest.reservedTo[1]+"-"+rentRequest.reservedTo[2]+" "+rentRequest.reservedTo[3]+":"+rentRequest.reservedTo[4]);
          let dateToday = new Date();
          let exists = false;
        //  this.customerRentRequestsService.sentFeedback(this.user.id,advertisement.id).subscribe(data => {
        //      exists = data;
        //  });
          if (rentRequest.rentRequestStatus === "PAID" && (dateReserved.getTime()<dateToday.getTime()) && !exists) {
            console.log(rentRequest.rentRequestStatus+" "+rentRequest.id+" "+advertisement.car.carModel.name +" "+ !exists);
            this.btnPostComment[advertisement.id] = true;
          } else {
            if (typeof this.btnPostComment[advertisement.id] === "undefined")
              this.btnPostComment[advertisement.id] = false;
          }
        }
      }
      console.log(this.btnPostComment);
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

  openModal(content: TemplateRef<any>, advertisement: Advertisement) {
    this.clickedAdvertisement = advertisement;
    this.currentRate = advertisement.car.averageRating;
    this.currentRateChanged = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  postComment() {
    // tslint:disable-next-line:prefer-for-of
    let commentText = (document.getElementById('postComment') as HTMLInputElement).value;
    if (commentText=="") {
      alert('You can\'t leave an empty comment.');
      return;
    }
    if (!this.currentRateChanged) {
      alert('Rating is required.');
      return;
    }
    this.newComment = new Comment(this.user,commentText,this.clickedAdvertisement);
    console.log("ad: "+ this.newComment.advertisementDto);
    this.customerRentRequestsService.postComment(this.newComment).subscribe();
    this.clickedAdvertisement.car.averageRating = 
    Math.round((this.clickedAdvertisement.car.averageRating*this.clickedAdvertisement.car.timesRated+this.currentRate)
    /(this.clickedAdvertisement.car.timesRated+1)*100)/100;
    this.clickedAdvertisement.car.timesRated++;
    console.log(this.clickedAdvertisement.car.averageRating+" "+this.clickedAdvertisement.car.timesRated);
    if (this.currentRateChanged) {
      this.customerRentRequestsService.rate(this.clickedAdvertisement.car).subscribe(
        () => { 
          this.ngOnInit();
       }
     );
    }
    this.currentRateChanged = false;
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

  changeRate() {
    this.currentRateChanged = true;
  }

}
