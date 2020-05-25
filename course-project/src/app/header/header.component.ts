import {Component, OnInit} from '@angular/core';
import {StaticRoutesEnum} from '../routing/routes/types';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  routes = StaticRoutesEnum;

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
  }

  onSaveRecipes(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes(): void {
    this.dataStorageService.fetchRecipes();
  }
}
