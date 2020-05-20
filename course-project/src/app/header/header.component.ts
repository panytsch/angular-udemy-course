import {Component, OnInit} from '@angular/core';
import {RoutesEnum} from '../routing/routes/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  routes = RoutesEnum;

  constructor() {
  }

  ngOnInit(): void {
  }
}
