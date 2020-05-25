import {Component, OnDestroy, OnInit} from '@angular/core';
import {StaticRoutesEnum} from '../routing/routes/types';
import {DataStorageService} from '../shared/data-storage.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  routes = StaticRoutesEnum;

  constructor(private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
  }

  onSaveRecipes(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes(): void {
    this.subs.push(this.dataStorageService.fetchRecipes().subscribe());
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
