import {Component, OnInit, TemplateRef} from '@angular/core';
import {CustomerHomePageService} from './customer-home-page.service';
import {faComments, faInfo, faCommentAlt, faUser, faCartPlus, faCheckDouble} from '@fortawesome/free-solid-svg-icons';
import {Advertisement} from '../model/advertisement';
import {Comment} from '../model/comment';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from '../app.component';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-customer-home-page',
  templateUrl: './customer-home-page.component.html',
  styleUrls: ['./customer-home-page.component.css']
})
export class CustomerHomePageComponent implements OnInit {

  faInfo = faInfo;
  faComment = faCommentAlt;
  faUser = faUser;
  allAdvertisements: Advertisement[] = [];
  allImagesForAd: string[] = [];
  closeResult: string;
  moreInfoAdvertisement: Advertisement;
  private readonly imageType: string = 'data:image/PNG;base64,';
  comments: Comment[] = [];
  faCart = faCartPlus;
  faCartMinus = faCheckDouble;
  cart: Advertisement[] = [];
  notifier: NotifierService;

  constructor(private customerHomePageService: CustomerHomePageService, private domSanitizer: DomSanitizer,
              private modalService: NgbModal, private appComponent: AppComponent, private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.customerHomePageService.getAllAdvertisements().subscribe(data => {
      this.appComponent.role = localStorage.getItem('role');
      this.allAdvertisements = data;

      for (const advertisement of this.allAdvertisements) {
        advertisement.image = [];
        this.customerHomePageService.getAdvertisementPhotos(advertisement.id).subscribe(img => {
          console.log(img as string);
          const images = img.toString();
          this.allImagesForAd = images.split(',');
          for (let i = 0; i < this.allImagesForAd.length; i++) {
            advertisement.image.push(this.domSanitizer.bypassSecurityTrustUrl(this.imageType + this.allImagesForAd[i]));
          }
        });
      }
    });
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
    this.customerHomePageService.getComments(advertisement.id).subscribe(data => {
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

  sendRentRequest() {
    /*const customer = new User(this.customerData.value.firstName, this.customerData.value.lastName, this.customerData.value.email,
      this.customerData.value.country, this.customerData.value.city, this.customerData.value.address, this.customerData.value.phone);

    const rentRequest = new RentRequest(this.startDate, this.endDate, customer, this.cart);
    this.rentACarService.createRentRequest(rentRequest).subscribe(data => {
      this.showNotification('success', 'Successfully created rent request.');
      this.router.navigate(['homePage']);
    });*/
  }

}
