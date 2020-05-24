import { Component, OnInit } from '@angular/core';
import {faComments} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-agent-home-page',
  templateUrl: './agent-home-page.component.html',
  styleUrls: ['./agent-home-page.component.css']
})
export class AgentHomePageComponent implements OnInit {
  faMessages = faComments;
  constructor() { }

  ngOnInit(): void {
  }

}
