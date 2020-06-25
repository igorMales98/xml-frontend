import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountConfirmationService} from './account-confirmation.service';

@Component({
  selector: 'app-account-confirmation',
  templateUrl: './account-confirmation.component.html',
  styleUrls: ['./account-confirmation.component.css']
})
export class AccountConfirmationComponent implements OnInit {

  currentUrl: string;

  constructor(private router: Router, private accountConfirmationService: AccountConfirmationService) {
  }

  ngOnInit(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.currentUrl = this.router.url;
    console.log(this.currentUrl);
    this.accountConfirmationService.confirmAcount('http://localhost:8083/api/users' + this.currentUrl);
  }

}
