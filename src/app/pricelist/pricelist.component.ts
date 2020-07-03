import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PricelistService} from './pricelist.service';
import {Pricelist} from '../model/pricelist';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {

  pricelistForm: FormGroup;
  editPriceForm: FormGroup;
  notifier: NotifierService;
  priceToEdit: Pricelist;
  idToDelete: number;

  allPricelists: Pricelist[] = [];

  constructor(private formBuilder: FormBuilder, private pricelistService: PricelistService,
              private notifierService: NotifierService, private router: Router, private modalService: NgbModal) {
    this.notifier = notifierService;
    this.router = router;
  }

  get pricelistFb() {
    return this.pricelistForm.controls;
  }

  get editPricelistFb() {
    return this.editPriceForm.controls;
  }

  ngOnInit(): void {
    this.pricelistForm = this.formBuilder.group({
      pricePerDay: ['', [Validators.required, Validators.pattern(/^[+]?\d+([.]\d+)?$/), Validators.maxLength(6), Validators.minLength(1)]],
      pricePerKm: ['', [Validators.required, Validators.pattern(/^[+]?\d+([.]\d+)?$/), Validators.maxLength(6), Validators.minLength(1)]],
      priceForCDW: ['', [Validators.required, Validators.pattern(/^[+]?\d+([.]\d+)?$/), Validators.maxLength(6), Validators.minLength(1)]]
    });
    this.pricelistService.getAllPricelists().subscribe(data => {
      this.allPricelists = data;
    });

    this.editPriceForm = this.formBuilder.group({
      id: [''],
      pricePerDay: ['', [Validators.required, Validators.pattern(/^[+]?\d+([.]\d+)?$/), Validators.maxLength(6), Validators.minLength(1)]],
      pricePerKm: ['', [Validators.required, Validators.pattern(/^[+]?\d+([.]\d+)?$/), Validators.maxLength(6), Validators.minLength(1)]],
      priceForCDW: ['', [Validators.required, Validators.pattern(/^[+]?\d+([.]\d+)?$/), Validators.maxLength(6), Validators.minLength(1)]]
    });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  addPriceToPricelist() {
    const price = new Pricelist('', this.pricelistForm.value.pricePerDay, this.pricelistForm.value.pricePerKm,
      this.pricelistForm.value.priceForCDW);
    this.pricelistService.createPricelist(price).subscribe(data => {
        this.showNotification('success', 'A new price is successfuly added to pricelist.');
        this.ngOnInit();
      },
      error => {
        this.showNotification('error', 'Invalid input error! Try again.');
      });
  }

  openConfirmDeleteModal(targetModal, id) {
    this.idToDelete = id;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }

  deletePricelist() {
    this.pricelistService.deletePricelist(this.idToDelete).subscribe(data => {
      this.showNotification('success', 'Price is successfuly deleted.');
      this.modalService.dismissAll();
      this.ngOnInit();

    });
  }

  openModal(targetModal, pricelist) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.editPriceForm.patchValue({
      id: pricelist.id,
      pricePerDay: pricelist.pricePerDay,
      pricePerKm: pricelist.pricePerKm,
      priceForCDW: pricelist.priceForCDW
    });
  }

  saveChanges(pricelist: Pricelist) {
    pricelist = this.editPriceForm.getRawValue();
    this.pricelistService.editPricelist(pricelist).subscribe(data => {
        this.showNotification('success', 'Price is successfuly edited.');
        this.modalService.dismissAll();
        this.ngOnInit();
      },
      error => {
        this.showNotification('error', 'Invalid input error! Try again.');
      });
  }

  onSubmit() {
    this.modalService.dismissAll();
    console.log('res:', this.editPriceForm.getRawValue());
  }


}
