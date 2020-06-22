import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {TransmissionType} from 'src/app/model/transmissionType';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TransmissionTypeService} from './transmission-type.service';

@Component({
  selector: 'app-transmission-type',
  templateUrl: './transmission-type.component.html',
  styleUrls: ['./transmission-type.component.css']
})
export class TransmissionTypeComponent implements OnInit {

  transmissionTypeForm: FormGroup;
  editTransmissionTypeForm: FormGroup;
  notifier: NotifierService;
  transmissionTypeToEdit: TransmissionType;
  idToDelete: number;

  allTransmissionTypes: TransmissionType[] = [];

  constructor(private formBuilder: FormBuilder, private transmissionTypeService: TransmissionTypeService,
              private notifierService: NotifierService, private router: Router, private modalService: NgbModal) {
    this.notifier = notifierService;
    this.router = router;
  }

  get transmissionTypeFb() {
    return this.transmissionTypeForm.controls;
  }

  get editTransmissionTypeFb() {
    return this.editTransmissionTypeForm.controls;
  }

  ngOnInit(): void {
    this.transmissionTypeForm = this.formBuilder.group({
      transmissionTypeName: ['', [Validators.required, Validators.pattern(/^[A-Za-z.-]*$/), Validators.maxLength(15),
        Validators.minLength(1)]]
    });
    this.transmissionTypeService.getAllTransmissionTypes().subscribe(data => {
      this.allTransmissionTypes = data;
    });

    this.editTransmissionTypeForm = this.formBuilder.group({
      id: [''],
      transmissionTypeNameEdit: ['', [Validators.required, Validators.pattern(/^[A-Za-z.-]*$/), Validators.maxLength(15),
        Validators.minLength(1)]]
    });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  addNameToTransmissionType() {
    const name = new TransmissionType('', this.transmissionTypeForm.value.transmissionTypeName);
    this.transmissionTypeService.createTransmissionType(name).subscribe(data => {
        this.showNotification('success', 'A new name is successfuly added to Transmission type.');
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

  deleteTransmissionType() {
    this.transmissionTypeService.deleteTransmissionType(this.idToDelete).subscribe(data => {
      this.showNotification('success', 'Transmission type name is successfuly deleted.');
      this.modalService.dismissAll();
      this.ngOnInit();

    });
  }

  openModal(targetModal, transmissionType) {
    this.transmissionTypeToEdit = transmissionType;
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.transmissionTypeForm.patchValue({
      id: transmissionType.id,
      name: transmissionType.name
    });
  }

  saveChanges() {
    this.transmissionTypeToEdit.name = this.editTransmissionTypeForm.value.transmissionTypeNameEdit;
    this.transmissionTypeService.editTransmissionType(this.transmissionTypeToEdit).subscribe(data => {
        this.showNotification('success', 'Transmission Type name is successfuly edited.');
        this.modalService.dismissAll();
        this.ngOnInit();
      },
      error => {
        this.showNotification('error', 'Invalid input error! Try again.');
      });
  }

  onSubmit() {
    this.modalService.dismissAll();
    console.log('res:', this.editTransmissionTypeForm.getRawValue());
  }

}
