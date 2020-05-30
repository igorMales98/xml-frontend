import {Component, OnInit, TemplateRef} from '@angular/core';
import {CarBrand} from '../model/carBrand';
import {CarModel} from '../model/carModel';
import {FuelType} from '../model/fuelType';
import {TransmissionType} from '../model/transmissionType';
import {Pricelist} from '../model/pricelist';
import {CarClass} from '../model/carClass';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faCalendar, faWindowClose, faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {CreateAdvertisementService} from './create-advertisement.service';
import {ModalDismissReasons, NgbDatepickerConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {CreateAdvertisements} from '../model/createAdvertisements';
import {UserService} from '../security/user.service';
import {User} from '../model/user';

@Component({
  selector: 'app-agent-create-advertisement',
  templateUrl: './create-advertisement.component.html',
  styleUrls: ['./create-advertisement.component.css']
})
export class CreateAdvertisementComponent implements OnInit {

  isBrandDropdownInvalid = true;
  isModelDropdownInvalid = true;
  isFuelTypeDropDownInvalid = true;
  isTransmissionTypeDropdownInvalid = true;
  isClassDropdownInvalid = true;
  isPriceListNotSelected = true;

  allCarBrands: CarBrand[] = [];
  allCarBrandModels: CarModel[] = [];
  allFuelTypes: FuelType[] = [];
  allTransmissionTypes: TransmissionType[] = [];
  allCarClasses: CarClass[] = [];
  allPricelists: Pricelist[] = [];

  isCarBrandSelected = false;
  isPricelistSelected = false;

  selectedCarBrand = 'Select car brand';
  selectedCarModel = 'Select car model';
  selectedFuelType = 'Select fuel type';
  selectedTransmissionType = 'Select transmission type';
  selectedCarClass = 'Select car class';
  selectedPricelist = 'Select price list';

  tempPricelist: Pricelist;
  finalPricelist: Pricelist;
  finalCarBrand: CarBrand;
  finalCarModel: CarModel;
  finalFuelType: FuelType;
  finalTransmissionType: TransmissionType;
  finalCarClass: CarClass;
  hasACDW = false;
  isUnlimited = true;

  closeResult: string;
  advertisementForm: FormGroup;
  numberOfDiscounts = 0;
  discountForm: FormGroup;

  todayDate: any;
  minDate = undefined;
  minDate2 = undefined;
  selectedStartDate: string;
  selectedEndDate: string;

  public imagePath;
  imgURLS: any[] = [];
  public message: string;
  selectedFiles: Blob[] = [];

  d1: Date;
  d2: Date;
  helpDate: Date;
  dates: string[] = [];

  faCalendar = faCalendar;
  faClose = faWindowClose;
  faPlus = faPlus;
  faMinus = faMinus;

  notifier: NotifierService;
  role;

  user: User;

  constructor(private router: Router, private createAdvertisementService: CreateAdvertisementService,
              private modalService: NgbModal, private formBuilder: FormBuilder, private datePipe: DatePipe,
              private config: NgbDatepickerConfig, private notifierService: NotifierService, public userService: UserService) {
    this.notifier = notifierService;
    this.todayDate = new Date();
    this.minDate = {
      year: this.todayDate.getFullYear(),
      month: this.todayDate.getMonth() + 1,
      day: this.todayDate.getDate() + 1
    };
    this.minDate2 = {
      year: this.todayDate.getFullYear(),
      month: this.todayDate.getMonth() + 1,
      day: this.todayDate.getDate() + 2
    };
  }

  ngOnInit(): void {
    this.userService.getMyInfo();
    this.user = this.userService.currentUser;

    this.role = localStorage.getItem('role');
    this.advertisementForm = this.formBuilder.group({
      mileage: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(1),
        Validators.maxLength(10), Validators.min(0)]],
      childSeats: ['', [Validators.required, Validators.pattern(/^[0-5]*$/), Validators.max(5), Validators.min(0)]],
      allowedDistance: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(6), Validators.minLength(1)]]
    });
    this.discountForm = this.formBuilder.group({
      days0: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.max(90), Validators.min(1)]],
      days1: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.max(90), Validators.min(1)]],
      days2: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.max(90), Validators.min(1)]],
      discount0: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.max(99), Validators.min(1)]],
      discount1: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.max(99), Validators.min(1)]],
      discount2: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.max(99), Validators.min(1)]],
    });

    this.createAdvertisementService.getAllCarBrands().subscribe(data => {
      this.allCarBrands = data;
    });
    this.createAdvertisementService.getAllFuelTypes().subscribe(data => {
      this.allFuelTypes = data;
    });
    this.createAdvertisementService.getAllTransmissionTypes().subscribe(data => {
      this.allTransmissionTypes = data;
    });
    this.createAdvertisementService.getAllCarClasses().subscribe(data => {
      this.allCarClasses = data;
    });
    this.createAdvertisementService.getAllPricelists().subscribe(data => {
      this.allPricelists = data;
    });
  }

  get adFb() {
    return this.advertisementForm.controls;
  }

  get dsF() {
    return this.discountForm.controls;
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  counter(i: number) {
    return new Array(i);
  }

  getBrandModels(carBrand: CarBrand) {
    if (carBrand.name !== this.selectedCarBrand) {
      this.createAdvertisementService.getCarBrandModels(carBrand.id).subscribe(data => {
        this.allCarBrandModels = data;

        this.isBrandDropdownInvalid = false;
        this.isCarBrandSelected = true;
        this.selectedCarBrand = carBrand.name;
        this.selectedCarModel = 'Select car model';
        this.isModelDropdownInvalid = true;
        this.finalCarBrand = carBrand;
      });
    }
  }


  selectModel(carModel: CarModel) {
    this.selectedCarModel = carModel.name;
    this.isModelDropdownInvalid = false;
    this.finalCarModel = carModel;
  }

  selectFuelType(fuelType: FuelType) {
    this.selectedFuelType = fuelType.name;
    this.isFuelTypeDropDownInvalid = false;
    this.finalFuelType = fuelType;
  }

  selectTransmissionType(transmissionType: TransmissionType) {
    this.selectedTransmissionType = transmissionType.name;
    this.isTransmissionTypeDropdownInvalid = false;
    this.finalTransmissionType = transmissionType;
  }

  selectCarClass(carClass: CarClass) {
    this.selectedCarClass = carClass.name;
    this.isClassDropdownInvalid = false;
    this.finalCarClass = carClass;
  }

  openPriceListsModal(myModalPriceList: TemplateRef<any>) {
    this.modalService.open(myModalPriceList, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  selectPricelist(pricelist: Pricelist) {
    this.isPricelistSelected = true;
    this.tempPricelist = pricelist;
    console.log(pricelist);
  }

  confirmSelection() {
    this.finalPricelist = this.tempPricelist;
    this.selectedPricelist = this.finalPricelist.pricePerDay + ' $ per day';
    this.isPriceListNotSelected = false;
    this.modalService.dismissAll();
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    this.selectedFiles.push(files[0]);
    // this.selectedFile = files[0];

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURLS.push(reader.result);
    };
  }

  selectStartDate() {
    console.log(this.selectedStartDate);
    const datee = moment(this.selectedStartDate).format('YYYY-MM-DD');
    this.helpDate = new Date(datee);
    this.helpDate.setMonth(this.helpDate.getMonth() - 1);
    const datum = this.datePipe.transform(this.helpDate, 'yyyy-MM-dd');
    this.helpDate = new Date(datum);
    this.dates = datum.split('-');

    this.minDate2 = {
      year: +this.dates[0],
      month: +this.dates[1],
      day: +this.dates[2] + 1
    };

    this.selectedEndDate = undefined;
  }

  selectEndDate() {
    console.log(this.selectedEndDate);
  }


  isStartDateValid() {
    return this.selectedStartDate !== null && this.selectedStartDate !== undefined;
  }

  isEndDateValid() {
    return this.selectedEndDate !== null && this.selectedEndDate !== undefined;
  }

  isEverythingValid() {
    return this.finalCarBrand !== undefined && this.finalCarModel !== undefined && this.finalFuelType !== undefined &&
      this.finalCarClass !== undefined && this.finalTransmissionType !== undefined && (this.advertisementForm.valid || this.isUnlimited) &&
      this.selectedStartDate !== undefined && this.selectedStartDate !== null && this.selectedEndDate !== undefined &&
      this.selectedEndDate !== null && this.imgURLS.length !== 0;
  }

  createAd() {
    const date1 = moment(this.selectedStartDate).format('YYYY-MM-DD');
    const date2 = moment(this.selectedEndDate).format('YYYY-MM-DD');
    this.d1 = new Date(date1);
    this.d2 = new Date(date2);
    this.d1.setMonth(this.d1.getMonth() - 1);
    this.d2.setMonth(this.d2.getMonth() - 1);
    if (this.isUnlimited) {
      this.advertisementForm.value.allowedDistance = 1000000;
    }
    const discountMap = new Map<number, number>();
    if (this.dsF.days0.valid && this.dsF.discount0.valid) {
      discountMap.set(this.discountForm.value.days0, this.discountForm.value.discount0);
    }

    if (this.dsF.days1.valid && this.dsF.discount1.valid) {
      if (!discountMap.has(this.discountForm.value.days1)) {
        discountMap.set(this.discountForm.value.days1, this.discountForm.value.discount1);
      }
    }

    if (this.dsF.days2.valid && this.dsF.discount2.valid) {
      if (!discountMap.has(this.discountForm.value.days2)) {
        discountMap.set(this.discountForm.value.days2, this.discountForm.value.discount2);
      }
    }
    console.log(discountMap);
    let convMap = '';
    discountMap.forEach((val: number, key: number) => {
      convMap += val + '?' + key + ':';
    });
    console.log(convMap);
    const createAdvertisement = new CreateAdvertisements(this.finalCarBrand, this.finalCarModel, this.finalCarClass, this.finalFuelType,
      this.finalTransmissionType, this.finalPricelist, this.d1,
      this.d2, this.advertisementForm.value.mileage,
      this.advertisementForm.value.childSeats, this.hasACDW, this.advertisementForm.value.allowedDistance, convMap, this.user.id);
    this.createAdvertisementService.createAdvertisement(this.selectedFiles, createAdvertisement);
    this.showNotification('success', 'Successfully created an advertisement.');
    // this.router.navigate(['/homePage']);
  }

  changeCDW() {
    console.log('adfasf' + this.discountForm.value.days0);
    this.hasACDW = this.hasACDW !== true;
    console.log(this.hasACDW);
  }

  changeIsUnlimited() {
    this.isUnlimited = this.isUnlimited !== true;
    console.log(this.isUnlimited);
  }

  removeImage(image: any) {
    const index: number = this.imgURLS.indexOf(image);
    if (index !== -1) {
      this.imgURLS.splice(index, 1);
      this.selectedFiles.splice(index, 1);
    }
  }

  addDiscountRow() {
    this.numberOfDiscounts += 1;
  }

  removeDiscountRow() {
    this.numberOfDiscounts -= 1;
  }

  checkValidDays(i: number) {
    if (i === 0) {
      return this.dsF.days0.valid && this.dsF.days0.touched;
    } else if (i === 1) {
      return this.dsF.days1.valid && this.dsF.days1.touched;
    } else if (i === 2) {
      return this.dsF.days2.valid && this.dsF.days2.touched;
    }
  }

  checkValidDiscount(i: number) {
    if (i === 0) {
      return this.dsF.discount0.valid && this.dsF.discount0.touched;
    } else if (i === 1) {
      return this.dsF.discount0.valid && this.dsF.discount1.touched;
    } else if (i === 2) {
      return this.dsF.discount0.valid && this.dsF.discount2.touched;
    }
  }

}
