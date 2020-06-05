import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarBrandService} from './car-brand.service';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CarBrand } from 'src/app/model/carBrand';

@Component({
  selector: 'app-car-brand',
  templateUrl: './car-brand.component.html',
  styleUrls: ['./car-brand.component.css']
})
export class CarBrandComponent implements OnInit {

  carBrandForm: FormGroup;
  editCarBrandForm: FormGroup;
  notifier: NotifierService;
  carBrandToEdit: CarBrand;
  idToDelete: number;

  allCarBrands: CarBrand[] = [];

    constructor(private formBuilder: FormBuilder, private carBrandService: CarBrandService,
                private notifierService: NotifierService, private router: Router, private modalService: NgbModal) {
      this.notifier = notifierService;
      this.router = router;
    }

    get carBrandFb() {
      return this.carBrandForm.controls;
    }

    get editCarBrandFb() {
      return this.editCarBrandForm.controls;
    }

    ngOnInit(): void {
      this.carBrandForm = this.formBuilder.group({
        carBrandName: ['', [Validators.required, Validators.pattern(/^[A-Za-z.-]*$/), Validators.maxLength(15), Validators.minLength(1)]]
      });
      this.carBrandService.getAllCarBrands().subscribe(data => {
        this.allCarBrands = data;
      });

      this.editCarBrandForm = this.formBuilder.group({
        id: [''],
        carBrandNameEdit: ['', [Validators.required, Validators.pattern(/^[A-Za-z.-]*$/), Validators.maxLength(15), Validators.minLength(1)]]
      });
    }

    public showNotification(type: string, message: string): void {
      this.notifier.notify(type, message);
    }

    addNameToCarBrand() {
      const name = new CarBrand(this.carBrandForm.value.carBrandName);
      this.carBrandService.createCarBrand(name).subscribe(data => {
          this.showNotification('success', 'A new name is successfuly added to Car Brand.');
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

    deleteCarBrand() {
      this.carBrandService.deleteCarBrand(this.idToDelete).subscribe(data => {
        this.showNotification('success', 'Car brand name is successfuly deleted.');
        this.modalService.dismissAll();
        this.ngOnInit();

      },
      error => {
        this.showNotification('error', 'Car brand is used in advertisement.');
        this.modalService.dismissAll();
      });
    }

    openModal(targetModal, carBrand) {
      this.carBrandToEdit = carBrand;
      this.modalService.open(targetModal, {
        centered: true,
        backdrop: 'static'
      });

      this.carBrandForm.patchValue({
        id: carBrand.id,
        name: carBrand.name
      });
    }

    saveChanges() {
      // const carBrand = new CarBrand(this.carBrandForm.value.name);
      this.carBrandToEdit.name = this.editCarBrandForm.value.carBrandNameEdit;
      this.carBrandService.editCarBrand(this.carBrandToEdit).subscribe(data => {
          this.showNotification('success', 'Car brand name is successfuly edited.');
          this.modalService.dismissAll();
          this.ngOnInit();
        },
        error => {
          this.showNotification('error', 'Invalid input error! Try again.');
        });
    }

    onSubmit() {
      this.modalService.dismissAll();
      console.log('res:', this.editCarBrandForm.getRawValue());
    }

}
