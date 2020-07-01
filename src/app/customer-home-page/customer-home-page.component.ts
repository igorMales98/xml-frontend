import {Component, OnInit, TemplateRef} from '@angular/core';
import {CustomerHomePageService} from './customer-home-page.service';
import {
  faComments,
  faInfo,
  faCommentAlt,
  faUser,
  faCartPlus,
  faCheckDouble,
  faArrowDown,
  faArrowUp
} from '@fortawesome/free-solid-svg-icons';
import {Advertisement} from '../model/advertisement';
import {Comment} from '../model/comment';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from '../app.component';
import {NotifierService} from 'angular-notifier';
import {UserService} from '../security/user.service';
import {User} from '../model/user';
import {SlideInOutAnimation} from '../animations/animations';
import {DatePipe} from '@angular/common';
import {RentRequest} from '../model/rentRequest';
import {Router} from '@angular/router';
import {CarBrand} from '../model/carBrand';
import {CarModel} from '../model/carModel';
import {FuelType} from '../model/fuelType';
import {TransmissionType} from '../model/transmissionType';
import {CarClass} from '../model/carClass';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-customer-home-page',
  templateUrl: './customer-home-page.component.html',
  styleUrls: ['./customer-home-page.component.css'],
  animations: [SlideInOutAnimation]
})
export class CustomerHomePageComponent implements OnInit {

  faInfo = faInfo;
  faComment = faCommentAlt;
  faUser = faUser;
  faCart = faCartPlus;
  faCartMinus = faCheckDouble;
  faArrow = faArrowDown;

  allAdvertisements: Advertisement[] = [];
  basicSearchAdvertisements: Advertisement[] = [];
  comments: Comment[] = [];
  moreInfoAdvertisement: Advertisement;
  cart: Advertisement[] = [];
  allImagesForAd: string[] = [];
  private readonly imageType: string = 'data:image/PNG;base64,';

  closeResult: string;
  notifier: NotifierService;

  loggedInUser: User;

  loadContent = false;
  showSearch = false;
  searched = false;
  animationState = 'out';

  dateNow: Date;
  startDate: string;
  endDate: string;
  minDateStart: string;
  minDateEnd: string;
  pickupPlace = '';
  bundle = true;

  selectedCarBrand = 'Select car brand';
  allCarBrands: CarBrand[] = [];

  selectedCarModel = 'Select car model';
  allCarBrandModels: CarModel[] = [];
  isCarBrandSelected = false;

  selectedFuelType = 'Select fuel type';
  allFuelTypes: FuelType[] = [];

  selectedTransmissionType = 'Select transmission type';
  allTransmissionTypes: TransmissionType[] = [];

  selectedCarClass = 'Select car class';
  allCarClasses: CarClass[] = [];

  advancedSearch: FormGroup;
  hasACDW = false;

  constructor(private customerHomePageService: CustomerHomePageService, private domSanitizer: DomSanitizer,
              private modalService: NgbModal, private appComponent: AppComponent, private notifierService: NotifierService,
              private userService: UserService, private datePipe: DatePipe, private router: Router, private formBuilder: FormBuilder) {
    this.notifier = notifierService;
    this.dateNow = new Date();
    this.dateNow.setDate(this.dateNow.getDate() + 2);
    console.log(this.dateNow);
    this.startDate = this.dateNow.toISOString().slice(0, 16);
    this.endDate = this.dateNow.toISOString().slice(0, 16);
    this.minDateStart = this.datePipe.transform(this.dateNow, 'yyyy-MM-ddTHH:mm');
    this.minDateEnd = this.datePipe.transform(this.dateNow, 'yyyy-MM-ddTHH:mm');
  }

  ngOnInit(): void {
    this.appComponent.role = localStorage.getItem('role');
    this.userService.getMyInfo();
    this.loggedInUser = this.userService.currentUser;
    this.loadContent = true;

    setTimeout(() => {
      this.customerHomePageService.getAllAdvertisements().subscribe(data => {
        for (const ad of data) {
          if (ad.advertiser.id !== this.loggedInUser.id) {
            this.allAdvertisements.push(ad);
          }
        }

        for (const advertisement of this.allAdvertisements) {
          advertisement.image = [];
          const images = advertisement.img.toString();
          this.allImagesForAd = images.split(',');
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.allImagesForAd.length; i++) {
            advertisement.image.push(this.domSanitizer.bypassSecurityTrustUrl(this.imageType + this.allImagesForAd[i]));
          }

        }
        this.loadContent = false;
      });
    }, 2000);

    this.customerHomePageService.getAllCarBrands().subscribe(data => {
      this.allCarBrands = data;
    });
    this.customerHomePageService.getAllFuelTypes().subscribe(data => {
      this.allFuelTypes = data;
    });
    this.customerHomePageService.getAllTransmissionTypes().subscribe(data => {
      this.allTransmissionTypes = data;
    });
    this.customerHomePageService.getAllCarClasses().subscribe(data => {
      this.allCarClasses = data;
    });

    this.advancedSearch = this.formBuilder.group({
      mileage: ['', [Validators.pattern(/^[0-9]*$/), Validators.minLength(0),
        Validators.maxLength(10), Validators.min(0)]],
      distance: ['', [Validators.pattern(/^[0-9]*$/), Validators.maxLength(6),
        Validators.minLength(1)]],
      childSeats: ['', [Validators.pattern(/^[0-5]*$/), Validators.max(5), Validators.min(0)]],
      priceFrom: ['', [Validators.pattern(/^[0-9]*$/), Validators.maxLength(6), Validators.minLength(1)]],
      priceTo: ['', [Validators.pattern(/^[0-9]*$/), Validators.maxLength(6), Validators.minLength(1)]],
    });
  }

  get asf() {
    return this.advancedSearch.controls;
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

  sendRentRequest(myRents: TemplateRef<any>) {
    this.cart.sort((a, b) => +a.advertiser.id - +b.advertiser.id);
    console.log(this.cart);
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

  showSearchBar() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
    if (this.showSearch === false) {
      this.showSearch = true;
      this.faArrow = faArrowUp;
    } else {
      this.showSearch = false;
      this.faArrow = faArrowDown;
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

  search() {
    if (this.searched) {
      this.advancedSearchMethod(this.basicSearchAdvertisements);
      return;
    }
    this.allAdvertisements = [];
    this.customerHomePageService.getBasicSearch(this.startDate, this.endDate, this.pickupPlace).subscribe(data => {
      for (const ad of data) {
        if (ad.advertiser.id !== this.loggedInUser.id) {
          this.allAdvertisements.push(ad);
        }
      }
      for (const advertisement of this.allAdvertisements) {
        advertisement.image = [];
        const images = advertisement.img.toString();
        this.allImagesForAd = images.split(',');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.allImagesForAd.length; i++) {
          advertisement.image.push(this.domSanitizer.bypassSecurityTrustUrl(this.imageType + this.allImagesForAd[i]));
        }

      }
      this.basicSearchAdvertisements = this.allAdvertisements;
    });
    this.searched = true;
  }

  advancedSearchMethod(advertisements: Advertisement[]) {
    console.log('E sad je usao u napredni search sto i treba.');
    this.allAdvertisements = [];
    let allOk = true;
    let brandSearch = false;
    let modelSearch = false;
    let classSearch = false;
    let fuelSearch = false;
    let transmissionSearch = false;
    let mileageSearch = false;
    let distanceSearch = false;
    let childSeatsSearch = false;
    let priceFromSearch = false;
    let priceToSearch = false;

    if (this.selectedCarBrand !== 'Select car brand') {
      brandSearch = true;
    }
    if (this.selectedCarModel !== 'Select car model') {
      modelSearch = true;
    }
    if (this.selectedCarClass !== 'Select car class') {
      classSearch = true;
    }
    if (this.selectedFuelType !== 'Select fuel type') {
      fuelSearch = true;
    }
    if (this.selectedTransmissionType !== 'Select transmission type') {
      transmissionSearch = true;
    }
    if (this.asf.mileage.touched && this.asf.mileage.valid) {
      mileageSearch = true;
    }
    if (this.asf.distance.touched && this.asf.distance.valid) {
      distanceSearch = true;
    }
    if (this.asf.priceFrom.touched && this.asf.priceFrom.valid) {
      priceFromSearch = true;
    }
    if (this.asf.priceTo.touched && this.asf.priceTo.valid) {
      priceToSearch = true;
    }
    if (this.asf.childSeats.touched && this.asf.childSeats.valid) {
      childSeatsSearch = true;
    }

    for (const advertisement of advertisements) {

      if (brandSearch) {
        if (advertisement.car.carBrand.name === this.selectedCarBrand) {
          allOk = true;
        } else {
          allOk = false;
          continue;
        }
      }

      if (modelSearch) {
        if (advertisement.car.carModel.name === this.selectedCarModel) {
          allOk = true;
        } else {
          allOk = false;
          continue;
        }
      }

      if (classSearch) {
        if (advertisement.car.carClass.name === this.selectedCarClass) {
          allOk = true;
        } else {
          allOk = false;
          continue;
        }
      }

      if (fuelSearch) {
        if (advertisement.car.fuelType.name === this.selectedFuelType) {
          allOk = true;
        } else {
          allOk = false;
          continue;
        }
      }

      if (transmissionSearch) {
        if (advertisement.car.transmissionType.name === this.selectedTransmissionType) {
          allOk = true;
        } else {
          allOk = false;
          continue;
        }
      }

      if (mileageSearch) {
        if (advertisement.car.mileage <= this.advancedSearch.value.mileage) {
          allOk = true;
        } else {
          allOk = false;
          continue;
        }
      }

      if (distanceSearch) {
        if (advertisement.car.allowedDistance >= this.advancedSearch.value.distance) {
          allOk = true;
        } else {
          allOk = false;
          continue;
        }
      }

      if (priceFromSearch) {
        if (advertisement.pricelist.pricePerDay >= this.advancedSearch.value.priceFrom) {
          allOk = true;
        } else {
          allOk = false;
          continue;
        }
      }

      if (priceToSearch) {
        if (advertisement.pricelist.pricePerDay <= this.advancedSearch.value.priceTo) {
          allOk = true;
        } else {
          allOk = false;
          continue;
        }
      }

      if (childSeatsSearch) {
        if (advertisement.car.childSeats >= this.advancedSearch.value.childSeats) {
          allOk = true;
        } else {
          allOk = false;
          continue;
        }
      }

      if (this.hasACDW) {
        allOk = advertisement.car.collisionDamageWaiverExists === this.hasACDW;
      }

      if (allOk) {
        this.allAdvertisements.push(advertisement);
      }

    }
  }

  reset() {
    this.searched = false;
    this.allAdvertisements = [];
    this.basicSearchAdvertisements = [];
    this.cart = [];
    this.showSearchBar();
    this.selectedCarBrand = 'Select car brand';
    this.selectedCarModel = 'Select car model';
    this.selectedFuelType = 'Select fuel type';
    this.selectedTransmissionType = 'Select transmission type';
    this.selectedCarClass = 'Select car class';
    this.advancedSearch.reset();
    this.hasACDW = false;
    this.pickupPlace = '';
    this.ngOnInit();
  }

  confirmRent() {
    const rentRequest = new RentRequest(this.startDate, this.endDate, this.loggedInUser, this.cart, this.bundle, false);
    this.customerHomePageService.createRentRequest(rentRequest).subscribe(data => {
      this.showNotification('success', 'Successfully created rent request.');
      this.reset();
    });
    this.modalService.dismissAll();
  }

  changeBundle() {
    console.log(this.bundle);
  }

  getBrandModels(carBrand: CarBrand) {
    if (carBrand.name !== this.selectedCarBrand) {
      this.customerHomePageService.getCarBrandModels(carBrand.id).subscribe(data => {
        this.allCarBrandModels = data;
        this.selectedCarBrand = carBrand.name;
        this.selectedCarModel = 'Select car model';
        this.isCarBrandSelected = true;
      });
    }
  }

  selectModel(carModel: CarModel) {
    this.selectedCarModel = carModel.name;
  }

  selectFuelType(fuelType: FuelType) {
    this.selectedFuelType = fuelType.name;
  }

  selectTransmissionType(transmissionType: TransmissionType) {
    this.selectedTransmissionType = transmissionType.name;
  }

  selectCarClass(carClass: CarClass) {
    this.selectedCarClass = carClass.name;
  }

  changeCDW() {
    this.hasACDW = this.hasACDW !== true;
    console.log(this.hasACDW);
  }

  resetAdvanced() {
    this.allAdvertisements = this.basicSearchAdvertisements;
    this.selectedCarBrand = 'Select car brand';
    this.selectedCarModel = 'Select car model';
    this.selectedFuelType = 'Select fuel type';
    this.selectedTransmissionType = 'Select transmission type';
    this.selectedCarClass = 'Select car class';
    this.advancedSearch.reset();
    this.hasACDW = false;
  }
}
