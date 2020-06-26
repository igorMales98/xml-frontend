import {Component, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../security/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequest} from '../model/loginRequest';
import {NotifierService} from 'angular-notifier';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData: FormGroup;
  notifier: NotifierService;
  closeResult: string;

  forgotPasswordData: FormGroup;

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder,
              private notifierService: NotifierService, private modalService: NgbModal) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.userData = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[0-9A-Za-z.-]*$/), Validators.max(90), Validators.min(1)]],
      password: ['', [Validators.required]]
    });
    this.forgotPasswordData = this.formBuilder.group({
      email: ['', [Validators.required, this.emailDomainValidator, Validators.pattern(/[^ @]*@[^ @]*/)]],
    });
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

  login() {
    const loginRequest = new LoginRequest(this.userData.value.username, this.userData.value.password);

    this.userService.login(loginRequest).subscribe(
      () => {
        console.log(localStorage.getItem('user'));
        console.log(localStorage.getItem('role'));
        const role = localStorage.getItem('role');
        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/adminHomePage']);
        } else if (role === 'ROLE_AGENT') {
          this.router.navigate(['/agentHomePage']);
        } else if (role === 'ROLE_CUSTOMER') {
          this.router.navigate(['/customerHomePage']);
        } else {
          this.showNotification('error', 'Something went wrong.');
        }

        this.showNotification('success', 'Welcome ');
      },
      (err) => {
        this.showNotification('error', err.error);
      }
    );
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  get loginFb() {
    return this.userData.controls;
  }

  openForgotPasswordModal(forgotPasswordModal) {
    this.modalService.open(forgotPasswordModal, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      backdrop: 'static',
      size: 'lg'
    }).result.then((result) => {
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

  forgotPassword() {
    this.userService.forgotPassword(this.forgotPasswordData.value.email).subscribe(data => {
        this.router.navigate(['/login']);
        this.showNotification('success', 'New password has been sent to your email.');
      },
      error => {
        this.showNotification('error', 'User with this email does not exist.');
      });
    this.modalService.dismissAll();
  }

  get fp() {
    return this.forgotPasswordData.controls;
  }
}
