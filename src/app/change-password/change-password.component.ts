import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {ChangePasswordService} from './change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordData: FormGroup;
  valid = false;
  newPasswordData: FormGroup;
  notifier: NotifierService;


  constructor(private notifierService: NotifierService, private formBuilder: FormBuilder, private router: Router,
              private changePasswordService: ChangePasswordService) {
    this.notifier = notifierService;
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  ngOnInit(): void {
    this.passwordData = this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(5)]],
        passwordRepeat: ['', [Validators.required, Validators.minLength(5)]],
      },
      {validator: this.checkPasswords});

    this.newPasswordData = this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(5)]],
        passwordRepeat: ['', [Validators.required, Validators.minLength(5)]],
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

  get f() {
    return this.passwordData.controls;
  }

  get f2() {
    return this.newPasswordData.controls;
  }

  checkValidPassword() {
    this.changePasswordService.checkValidPassword(this.passwordData.value.password).subscribe(data => {
      this.valid = data;
      this.passwordData.disable();
      this.showNotification('info', 'Password is valid. You can change it now.');
    });
  }

  changePassword() {
    this.changePasswordService.changePassword(this.newPasswordData.value.password).subscribe(() => {
      this.showNotification('success', 'You have changed your password.');
      this.valid = false;
      this.passwordData.enable();
      this.passwordData.reset();
    });
  }
}
