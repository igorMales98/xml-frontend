import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {FuelType} from 'src/app/model/fuelType';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FuelTypeService} from './fuel-type.service';

@Component({
  selector: 'app-fuel-type',
  templateUrl: './fuel-type.component.html',
  styleUrls: ['./fuel-type.component.css']
})
export class FuelTypeComponent implements OnInit {

  fuelTypeForm: FormGroup;
  editFuelTypeForm: FormGroup;
  notifier: NotifierService;
  fuelTypeToEdit: FuelType;
  idToDelete: number;

  allFuelTypes: FuelType[] = [];

  constructor(private formBuilder: FormBuilder, private fuelTypeService: FuelTypeService,
              private notifierService: NotifierService, private router: Router, private modalService: NgbModal) {
    this.notifier = notifierService;
    this.router = router;
  }

  get fuelTypeFb() {
    return this.fuelTypeForm.controls;
  }

  get editFuelTypeFb() {
    return this.editFuelTypeForm.controls;
  }

  ngOnInit(): void {
    this.fuelTypeForm = this.formBuilder.group({
      fuelTypeName: ['', [Validators.required, Validators.pattern(/^[A-Za-z.-]*$/), Validators.maxLength(15), Validators.minLength(1)]]
    });
    this.fuelTypeService.getAllFuelTypes().subscribe(data => {
      this.allFuelTypes = data;
    });

    this.editFuelTypeForm = this.formBuilder.group({
      id: [''],
      fuelTypeNameEdit: ['', [Validators.required, Validators.pattern(/^[A-Za-z.-]*$/), Validators.maxLength(15),
        Validators.minLength(1)]]
    });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  addNameToFuelType() {
    const name = new FuelType('', this.fuelTypeForm.value.fuelTypeName);
    this.fuelTypeService.createFuelType(name).subscribe(data => {
        this.showNotification('success', 'A new name is successfuly added to Fuel Type.');
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

  deleteFuelType() {
    this.fuelTypeService.deleteFuelType(this.idToDelete).subscribe(data => {
      this.showNotification('success', 'Car class name is successfuly deleted.');
      this.modalService.dismissAll();
      this.ngOnInit();

    });
  }

  openModal(targetModal, fuelType) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.fuelTypeForm.patchValue({
      id: fuelType.id,
      name: fuelType.name
    });
  }

  saveChanges() {
    this.fuelTypeToEdit.name = this.editFuelTypeForm.value.fuelTypeNameEdit;
    this.fuelTypeService.editFuelType(this.fuelTypeToEdit).subscribe(data => {
        this.showNotification('success', 'Fuel Type name is successfuly edited.');
        this.modalService.dismissAll();
        this.ngOnInit();
      },
      error => {
        this.showNotification('error', 'Invalid input error! Try again.');
      });
  }

  onSubmit() {
    this.modalService.dismissAll();
    console.log('res:', this.editFuelTypeForm.getRawValue());
  }

}
