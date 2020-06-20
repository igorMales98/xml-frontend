import {Component, OnInit} from '@angular/core';
import {faSignInAlt, faSignOutAlt, faRegistered, faAd, faComments, faUserPlus, faUsers, faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {UserService} from './security/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'xmlfront';
  faLogin = faSignInAlt;
  faLogout = faSignOutAlt;
  faRegister = faRegistered;
  faCreateAd = faAd;
  faMessages = faComments;
  faUserPlus = faUserPlus;
  faUsers = faUsers;
  faPlusSquare = faPlusSquare;
  role;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.role = this.userService.getRole();
  }

  checkLoggedIn() {
    return this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout();
    this.role = null;
  }
}
