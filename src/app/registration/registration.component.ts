import {Component, OnInit} from '@angular/core';
import {NotifierService} from 'angular-notifier';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationRequest} from '../model/registrationRequest';
import {RegistrationService} from './registration.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userData: FormGroup;
  notifier: NotifierService;

  constructor(private notifierService: NotifierService, private registrationService: RegistrationService,
              private formBuilder: FormBuilder, private router: Router) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
      this.userData = this.formBuilder.group({
        username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
        email: ['', [Validators.required, this.emailDomainValidator, Validators.pattern(/[^ @]*@[^ @]*/)]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,30}$/), Validators.minLength(8), Validators.maxLength(30)]],
        passwordRepeat: ['', [Validators.required, Validators.minLength(5)]],
        firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(9), Validators.maxLength(10)]]
      },
      {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) {
    if (!group.controls.password.touched) {
      return null;
    }
    const pass = group.controls.password.value;
    const confirmPass = group.controls.passwordRepeat.value;
    return pass === confirmPass ? null : {notSame: true};
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

  get f() {
    return this.userData.controls;
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  register() {

    const registration = new RegistrationRequest(this.userData.value.username, this.userData.value.password, this.userData.value.firstName,
      this.userData.value.lastName, this.userData.value.email, this.userData.value.city, this.userData.value.country,
      this.userData.value.address, this.userData.value.phone);

    this.registrationService.create(registration).subscribe(data => {
      this.router.navigate(['/login'])
      this.showNotification('success', 'You successfully sent a registration request.');
    });
  }
}
