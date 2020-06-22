import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../security/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginRequest} from '../model/loginRequest';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userData: FormGroup;
  notifier: NotifierService;

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder,
              private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.userData = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[0-9A-Za-z.-]*$/), Validators.max(90), Validators.min(1)]],
      password: ['', [Validators.required]]
    });
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
}
