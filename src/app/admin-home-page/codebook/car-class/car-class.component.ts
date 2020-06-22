import {Component, OnInit} from '@angular/core';
import {CarClassService} from './car-class.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {CarClass} from 'src/app/model/carClass';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-car-class',
  templateUrl: './car-class.component.html',
  styleUrls: ['./car-class.component.css']
})
export class CarClassComponent implements OnInit {

  carClassForm: FormGroup;
  editCarClassForm: FormGroup;
  notifier: NotifierService;
  carClassToEdit: CarClass;
  idToDelete: number;

  allCarClasses: CarClass[] = [];

  constructor(private formBuilder: FormBuilder, private carClassService: CarClassService,
              private notifierService: NotifierService, private router: Router, private modalService: NgbModal) {
    this.notifier = notifierService;
    this.router = router;
  }

  get carClassFb() {
    return this.carClassForm.controls;
  }

  get editCarClassFb() {
    return this.editCarClassForm.controls;
  }

  ngOnInit(): void {
    this.carClassForm = this.formBuilder.group({
      carClassName: ['', [Validators.required, Validators.pattern(/^[A-Za-z.-]*$/), Validators.maxLength(15), Validators.minLength(1)]]
    });
    this.carClassService.getAllCarClasses().subscribe(data => {
      this.allCarClasses = data;
    });

    this.editCarClassForm = this.formBuilder.group({
      id: [''],
      carClassNameEdit: ['', [Validators.required, Validators.pattern(/^[A-Za-z.-]*$/), Validators.maxLength(15),
        Validators.minLength(1)]]
    });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  addNameToCarClass() {
    const name = new CarClass(this.carClassForm.value.carClassName);
    this.carClassService.createCarClass(name).subscribe(data => {
        this.showNotification('success', 'A new name is successfully added to Car Brand.');
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

  deleteCarClass() {
    this.carClassService.deleteCarClass(this.idToDelete).subscribe(data => {
      this.showNotification('success', 'Car class name is successfuly deleted.');
      this.modalService.dismissAll();
      this.ngOnInit();

    });
  }

  openModal(targetModal, carClass) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.carClassForm.patchValue({
      id: carClass.id,
      name: carClass.name
    });
  }

  saveChanges() {
    this.carClassToEdit.name = this.editCarClassForm.value.carClassNameEdit;
    this.carClassService.editCarClass(this.carClassToEdit).subscribe(data => {
        this.showNotification('success', 'Car class name is successfuly edited.');
        this.modalService.dismissAll();
        this.ngOnInit();
      },
      error => {
        this.showNotification('error', 'Invalid input error! Try again.');
      });
  }

  onSubmit() {
    this.modalService.dismissAll();
    console.log('res:', this.editCarClassForm.getRawValue());
  }

}
