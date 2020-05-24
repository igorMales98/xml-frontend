import {Component, OnInit} from '@angular/core';
import {AdminHomePageService} from './admin-home-page.service';
import {faComments} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {
  faMessages = faComments;
  constructor(private adminHomePageService: AdminHomePageService) {
  }

  ngOnInit(): void {
  }

  test() {
    this.adminHomePageService.getTest().subscribe();
  }

  test2() {
    this.adminHomePageService.getTest2().subscribe();
  }
}
