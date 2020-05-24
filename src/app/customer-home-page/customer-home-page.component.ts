import {Component, OnInit} from '@angular/core';
import {CustomerHomePageService} from './customer-home-page.service';

@Component({
  selector: 'app-customer-home-page',
  templateUrl: './customer-home-page.component.html',
  styleUrls: ['./customer-home-page.component.css']
})
export class CustomerHomePageComponent implements OnInit {

  constructor(private customerHomePageService: CustomerHomePageService) {
  }

  ngOnInit(): void {
  }

  test() {
    this.customerHomePageService.getTest().subscribe();
  }
}
