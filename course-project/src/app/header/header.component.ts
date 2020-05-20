import {Component, OnInit} from '@angular/core';
import {StaticRoutesEnum} from '../routing/routes/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  routes = StaticRoutesEnum;

  constructor() {
  }

  ngOnInit(): void {
  }
}
