import { Component, OnInit } from '@angular/core';
import { AdminHomePageService } from './admin-home-page.service';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {

  constructor(private adminHomePageService: AdminHomePageService ) { }

  ngOnInit(): void {
  }

  Test(){
    this.adminHomePageService.getTest().subscribe();
  }
}
