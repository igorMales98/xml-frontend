import {Component, OnInit, TemplateRef} from '@angular/core';
import {faComments, faInfo, faCommentAlt, faUser, faCartPlus, faCheckDouble} from '@fortawesome/free-solid-svg-icons';
import {Advertisement} from '../../model/advertisement';
import {Comment} from '../../model/comment';
import {AgentAdvertisementsService} from './agent-advertisements.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../security/user.service';
import {User} from '../../model/user';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {RentRequest} from '../../model/rentRequest';

@Component({
  selector: 'app-agent-advertisements',
  templateUrl: './agent-advertisements.component.html',
  styleUrls: ['./agent-advertisements.component.css']
})
export class AgentAdvertisementsComponent implements OnInit {

  faInfo = faInfo;
  faCommentAlt = faCommentAlt;
  faUser = faUser;
  faCart = faCartPlus;
  faCartMinus = faCheckDouble;

  allAdvertisements: Advertisement[] = [];
  comments: Comment[] = [];
  moreInfoAdvertisement: Advertisement;
  user: User;
  availableAdvertisements: Advertisement[] = [];
  cart: Advertisement[] = [];

  allImagesForAd: string[] = [];
  private readonly imageType: string = 'data:image/PNG;base64,';

  closeResult: string;
  clickedComment: string;

  customerData: FormGroup;
  startDate: string;
  endDate: string;
  minDateStart: string;
  minDateEnd: string;
  disableRest = false;

  physicalRent = false;
  notifier: NotifierService;
  bundle = true;

  constructor(private agentAdvertisementsService: AgentAdvertisementsService, private domSanitizer: DomSanitizer,
              private modalService: NgbModal, private userService: UserService, private datePipe: DatePipe,
              private notifierService: NotifierService, private formBuilder: FormBuilder) {
    this.notifier = notifierService;
    this.startDate = new Date().toISOString().slice(0, 16);
    this.endDate = new Date().toISOString().slice(0, 16);
    this.minDateStart = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');
    this.minDateEnd = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');
  }

  ngOnInit(): void {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;

    this.agentAdvertisementsService.getAllAgentAdvertisements(this.user.id).subscribe(data => {
      this.allAdvertisements = data;

      for (const advertisement of this.allAdvertisements) {
        advertisement.image = [];
        const images = advertisement.img.toString();
        this.allImagesForAd = images.split(',');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.allImagesForAd.length; i++) {
          advertisement.image.push(this.domSanitizer.bypassSecurityTrustUrl(this.imageType + this.allImagesForAd[i]));
        }

      }
    });

    this.customerData = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, this.emailDomainValidator, Validators.pattern(/[^ @]*@[^ @]*/)]],
      country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(9), Validators.maxLength(10)]]
    });
  }

  get fcd() {
    return this.customerData.controls;
  }

  emailDomainValidator(control: FormControl) {
    const email = control.value;
    const [name, domain] = email.split('@');
    if (domain !== 'gmail.com' && domain !== 'yahoo.com' && domain !== 'uns.ac.rs') {
      return {
        emailDomain: {
          parsedDomain: domain
        }
      };
    } else {
      return null;
    }
  }

  startDateChange() {
    console.log(this.startDate);
    this.minDateEnd = this.datePipe.transform(new Date(this.startDate), 'yyyy-MM-ddTHH:mm:ss');
    if (this.startDate > this.endDate) {
      this.endDate = this.startDate;
    }
  }

  endDateChange() {
    console.log(this.endDate);
  }

  reset() {
    this.disableRest = false;
    this.customerData.enable();
    this.availableAdvertisements = [];
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
    this.agentAdvertisementsService.getComments(advertisement.id).subscribe(data => {
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

  openModal(content: TemplateRef<any>, commentId: string) {
    this.clickedComment = commentId;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  sendReply() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i].id === this.clickedComment) {
        this.comments[i].reply = (document.getElementById('replyComment') as HTMLInputElement).value;
        this.agentAdvertisementsService.sendReply(this.comments[i]).subscribe();
        break;
      }
    }
  }

  showAvailableCars() {
    this.agentAdvertisementsService.getBasicSearchForMyAdvertisements(this.startDate, this.endDate, this.user.id).subscribe(data => {
      this.availableAdvertisements = data;
      this.customerData.disable();
      this.disableRest = true;

      for (const advertisement of this.availableAdvertisements) {
        advertisement.image = [];
        const images = advertisement.img.toString();
        this.allImagesForAd = images.split(',');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.allImagesForAd.length; i++) {
          advertisement.image.push(this.domSanitizer.bypassSecurityTrustUrl(this.imageType + this.allImagesForAd[i]));
        }

      }
    });
  }

  issueRent() {
    if (this.physicalRent === true) {
      document.getElementById('btnRent').textContent = 'Issue rent.';
    } else {
      document.getElementById('btnRent').textContent = 'See my advertisements.';
    }
    return this.physicalRent = this.physicalRent !== true;
  }

  addToCart(advertisement: Advertisement) {
    const index: number = this.cart.indexOf(advertisement);
    if (index !== -1) {
      this.cart.splice(index, 1);
      console.log(this.cart);
      this.showNotification('info', 'You removed car from the cart.');
      return;
    }
    this.cart.push(advertisement);
    console.log(this.cart);
    this.modalService.dismissAll();
    this.showNotification('success', 'You added car to the cart.');
  }

  checkIfInCart(advertisement: Advertisement) {
    const index: number = this.cart.indexOf(advertisement);
    return index !== -1;
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  changeBundle() {
    console.log(this.bundle);
  }

  confirmRent() {
    const newUser = new User(this.customerData.value.firstName, this.customerData.value.lastName, this.customerData.value.email,
      this.customerData.value.country, this.customerData.value.city, this.customerData.value.address, this.customerData.value.phone, true);
    const rentRequest = new RentRequest(this.startDate, this.endDate, newUser, this.cart, this.bundle, true);
    this.agentAdvertisementsService.createRentRequest(rentRequest).subscribe(data => {
      this.showNotification('success', 'Successfully created rent request.');
      this.reset();
      this.physicalRent = false;
      document.getElementById('btnRent').textContent = 'Issue rent.';
    });
    this.modalService.dismissAll();
  }

  sendRentRequest(myRents: TemplateRef<any>) {
    this.modalService.open(myRents, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
      windowClass: 'myCustomModalClass'
    }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  check(a: string) {
    console.log(a);
  }

}
