import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {CarModel} from 'src/app/model/carModel';
import {CarBrand} from 'src/app/model/carBrand';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarModelService} from './car-model.service';

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.css']
})
export class CarModelComponent implements OnInit {

  carModelForm: FormGroup;
  editCarModelForm: FormGroup;
  notifier: NotifierService;
  carModelToEdit: CarModel;
  idToDelete: string;
  chosenBrand: CarBrand;

  allCarModels: CarModel[] = [];
  allCarBrands: CarBrand[] = [];

  constructor(private formBuilder: FormBuilder, private carModelService: CarModelService,
              private notifierService: NotifierService, private router: Router, private modalService: NgbModal) {
    this.notifier = notifierService;
    this.router = router;
  }

  get carModelFb() {
    return this.carModelForm.controls;
  }

  get editCarModelFb() {
    return this.editCarModelForm.controls;
  }

  ngOnInit(): void {
    this.carModelForm = this.formBuilder.group({
      carModelName: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9.-]*$/), Validators.maxLength(15), Validators.minLength(1)]]
    });
    this.carModelService.getAllCarBrands().subscribe(data => {
      this.allCarBrands = data;
    })
    this.chosenBrand = null;

    this.editCarModelForm = this.formBuilder.group({
      id: [''],
      carModelNameEdit: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9.-]*$/), Validators.maxLength(15),
        Validators.minLength(1)]]
    });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  addNameToCarModel() {
    console.log(this.chosenBrand);
    const name = new CarModel(this.carModelForm.value.carModelName, this.chosenBrand);
    if (name.carBrand == null) {
      alert("You have to choose a car brand.");
      return;
    }
    this.carModelService.createCarModel(name).subscribe(data => {
        this.showNotification('success', 'A new name is successfuly added to Car Model.');
        this.ngOnInit();
        this.showBrandModels(name.carBrand);
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

  deleteCarModel() {
    this.carModelService.deleteCarModel(this.idToDelete).subscribe(data => {
      this.showNotification('success', 'Car model name is successfuly deleted.');
      this.modalService.dismissAll();
      this.showBrandModels(this.chosenBrand);

    });
  }

  openModal(targetModal, carModel) {
    this.carModelToEdit = carModel;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.carModelForm.patchValue({
      id: carModel.id,
      name: carModel.name
    });
  }

  saveChanges() {
    this.carModelToEdit.name = this.editCarModelForm.value.carModelNameEdit;
    this.carModelService.editCarModel(this.carModelToEdit).subscribe(data => {
        this.showNotification('success', 'Car model name is successfuly edited.');
        this.modalService.dismissAll();
        this.ngOnInit();
      },
      error => {
        this.showNotification('error', 'Invalid input error! Try again.');
      });
  }

  onSubmit() {
    this.modalService.dismissAll();
    console.log('res:', this.editCarModelForm.getRawValue());
  }

  showBrandModels(carBrand: CarBrand) {
    this.chosenBrand = carBrand;
    this.carModelService.getBrandModels(carBrand.id).subscribe( data => {
      this.allCarModels = data;
    });
  }

}
